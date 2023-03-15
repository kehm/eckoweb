import React, { useState, useEffect } from 'react';
import strings from '../../strings';
import formatDate from '../../utils/format-date';
import MiniMap from '../components/MiniMap';
import ProgressIndicator from '../components/ProgressIndicator';
import CreateContract from '../dialogs/CreateContract';
import useFetch from '../../hooks/useFetch';
import Metadata from './Metadata';
import InfoPopover from '../components/InfoPopover';
import DownloadButton from '../components/buttons/DownloadButton';
import { getContract } from '../../utils/api/contracts';
import { getDatasetFile } from '../../utils/api/datasets';
import ConfirmAction from '../dialogs/ConfirmAction';
import { parseGeoReference } from '../../utils/metadata-parser';

/**
 * Show details of selected dataset
 */
const Dataset = ({
    dataset, licenses, hideActions, onNav,
}) => {
    const media = useFetch(`${process.env.REACT_APP_API_URL}/media/dataset/${dataset.id}`);
    const [contract, setContract] = useState(undefined);
    const [action, setAction] = useState(false);
    const [error, setError] = useState(false);
    const [openDialog, setOpenDialog] = useState(false);
    const [openConfirm, setOpenConfirm] = useState(undefined);

    /**
     * Scroll to top on load
     */
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [dataset]);

    /**
     * Get contract for selected dataset
     */
    useEffect(() => {
        if (!hideActions && (!contract || contract.datasetId !== dataset.id)) {
            const getDatasetContract = async () => {
                try {
                    const tmpContract = await getContract(dataset.id);
                    setContract(tmpContract);
                } catch (err) { }
            };
            getDatasetContract();
        }
    }, [contract, dataset]);

    /**
     * Download file and open download dialog
     */
    const downloadFile = async () => {
        try {
            const blob = await getDatasetFile(dataset.id);
            const link = document.createElement('a');
            link.href = URL.createObjectURL(new Blob([blob]));
            link.download = dataset.fileInfo.fileName;
            link.click();
            URL.revokeObjectURL(link.href);
            setError(false);
        } catch (err) {
            setError(true);
        } finally {
            setAction(false);
        }
    };

    /**
     * Trigger action
     */
    useEffect(() => {
        if (action === 'DOWNLOAD') downloadFile();
    }, [action]);

    /**
     * Handle get dataset
     */
    const handleGetDataset = () => {
        if (dataset.contractStatus === 'ACCEPTED'
            || (contract && contract.datasetId === dataset.id && contract.status === 'ACCEPTED')) {
            setAction('DOWNLOAD');
        } else if (dataset.policy.terms) {
            setOpenDialog(true);
        } else setOpenConfirm(strings.textConfirmDownload);
    };

    /**
     * Render dataset info
     *
     * @returns JSX
     */
    const renderInfo = () => (
        <>
            {dataset.metadata.description && (
                <div className="my-10 max-w-xl">
                    <span className="font-light">
                        {strings.labelDescription}
                        :
                    </span>
                    <p className="break-words">{dataset.metadata.description}</p>
                </div>
            )}
            <dl className="max-w-xl">
                {dataset.metadata.collectionId && (
                    <>
                        <dt className="font-light mt-10">
                            {strings.labelOriginal}
                            :
                        </dt>
                        <dd>
                            <a
                                key={dataset.metadata.collectionId}
                                className="text-blue-400 block overflow-hidden overflow-ellipsis"
                                target="_blank"
                                rel="noopener noreferrer"
                                href={`https://ecko.uib.no/datasets/${dataset.metadata.collectionId}`}
                            >
                                {`https://ecko.uib.no/datasets/${dataset.metadata.collectionId}`}
                            </a>
                        </dd>
                    </>
                )}
                {dataset.metadata.parentEventId && (
                    <>
                        <dt className="relative font-light">
                            <span className="absolute -left-12 -top-2">
                                <InfoPopover content={strings.infoParentSet} />
                            </span>
                            {strings.labelCollection}
                        </dt>
                        <dd>
                            <a
                                key={dataset.metadata.collectionId}
                                className="text-blue-400 block overflow-hidden overflow-ellipsis"
                                target="_blank"
                                rel="noopener noreferrer"
                                href={`https://ecko.uib.no/datasets/${dataset.metadata.parentEventId}`}
                            >
                                {`https://ecko.uib.no/datasets/${dataset.metadata.parentEventId}`}
                            </a>
                        </dd>
                    </>
                )}
            </dl>
            {media.length > 0 && (
                <img
                    className="h-24 mt-6 mr-4 rounded cursor-pointer"
                    alt="Thumbnail"
                    src={`${process.env.REACT_APP_API_URL}/media/thumbnails/${media[0].mediaId}`}
                />
            )}
        </>
    );

    /**
     * Render geoplogical reference on map
     *
     * @returns Map
     */
    const renderGeoRef = () => {
        let latitude;
        let longitude;
        if (dataset.geoReference) {
            try {
                const geo = parseGeoReference(dataset.geoReference);
                latitude = geo.latitude;
                longitude = geo.longitude;
            } catch (err) {
                return null;
            }
        }
        if (latitude !== undefined && longitude !== undefined) {
            return (
                <div className="mt-16 hidden md:inline">
                    <MiniMap
                        selectable={false}
                        marker={{ latitude, longitude }}
                        scrollZoom={false}
                    />
                </div>
            );
        }
        return null;
    };

    return (
        <div className="m-auto px-2 sm:px-10 flex lg:pt-10 justify-center">
            {dataset && (
                <>
                    <div className="leading-loose mt-4">
                        <p>{`${dataset.metadata.survey.charAt(0)}${dataset.metadata.survey.substring(1).toLowerCase()}`}</p>
                        <h1>{dataset.metadata.datasetId}</h1>
                        <p className="font-light">
                            {`${strings.labelUploaded}: ${formatDate(dataset.metadata.createdAt, true)} ${dataset.metadata.createdAt !== dataset.metadata.modified ? `(${strings.modified}: ${formatDate(dataset.metadata.modified, true)})` : ''}`}
                        </p>
                        {!hideActions && (
                            <DownloadButton
                                dataset={dataset}
                                contract={contract}
                                onNav={onNav}
                                onDownload={() => handleGetDataset()}
                            />
                        )}
                        {renderInfo()}
                        {renderGeoRef()}
                        <div className="inline 2xl:hidden leading-loose">
                            <Metadata dataset={dataset} licenses={licenses} />
                        </div>
                    </div>
                    <div className="hidden 2xl:inline pl-40 leading-loose">
                        <Metadata dataset={dataset} licenses={licenses} />
                    </div>
                </>
            )}
            {error && <p className="error text-red-600 my-6">{strings.errorTryAgain}</p>}
            <CreateContract
                open={openDialog}
                dataset={dataset}
                onClose={() => setOpenDialog(false)}
                onSuccess={() => setContract(undefined)}
            />
            <ProgressIndicator open={action} />
            <ConfirmAction
                openContent={openConfirm}
                onClose={() => setOpenConfirm(undefined)}
                onConfirm={() => setAction('DOWNLOAD')}
            />
        </div>
    );
};

export default Dataset;
