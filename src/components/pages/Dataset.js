import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import GetAppOutlined from '@material-ui/icons/GetAppOutlined';
import SpeakerNotesOutlined from '@material-ui/icons/SpeakerNotesOutlined';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import LoginContext from '../../context/LoginContext';
import strings from '../../strings';
import formatDate from '../../utils/format-date';
import MiniMap from '../components/MiniMap';
import ProgressIndicator from '../components/ProgressIndicator';
import CreateContract from '../dialogs/CreateContract';
import useFetch from '../../hooks/useFetch';
import Metadata from './Metadata';
import InfoPopover from '../components/InfoPopover';

/**
 * Show details of selected dataset
 */
const Dataset = ({
    dataset, licenses, hideActions, onNav,
}) => {
    const { login } = useContext(LoginContext);
    const media = useFetch(`${process.env.REACT_APP_API_URL}/media/dataset/${dataset.id}`);
    const [contract, setContract] = useState(undefined);
    const [action, setAction] = useState(false);
    const [error, setError] = useState(false);
    const [openDialog, setOpenDialog] = useState(false);

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
            axios.get(`${process.env.REACT_APP_API_URL}/contracts/dataset/${dataset.id}`, {
                timeout: process.env.REACT_APP_HTTP_TIMEOUT,
            }).then((response) => {
                setContract(response.data);
            }).catch(() => { });
        }
    }, [contract, dataset]);

    /**
     * Download file and open download dialog
     */
    const downloadFile = async () => {
        axios.get(`${process.env.REACT_APP_API_URL}/datasets/${dataset.id}`, {
            headers: {
                'Accept': 'application/octect-stream',
            },
            timeout: process.env.REACT_APP_HTTP_TIMEOUT,
            responseType: 'blob',
        }).then((res) => {
            const link = document.createElement('a');
            link.href = URL.createObjectURL(new Blob([res.data]));
            link.download = dataset.fileInfo.fileName;
            link.click();
            URL.revokeObjectURL(link.href);
            setError(false);
        }).catch(() => {
            setError(true);
        }).finally(() => {
            setAction(false);
        });
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
        } else {
            confirmAlert({
                title: strings.headerConfirm,
                message: strings.textConfirmDownload,
                buttons: [
                    { label: strings.accept, onClick: () => setAction('DOWNLOAD') },
                    { label: strings.reject }],
            });
        }
    };

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
                const geoReference = JSON.parse(dataset.geoReference);
                latitude = parseFloat(geoReference[0]);
                longitude = parseFloat(geoReference[1]);
            } catch (err) {
                return null;
            }
        }
        if (latitude !== undefined && longitude !== undefined) {
            return (
                <div className="mt-16">
                    <MiniMap
                        selectable={false}
                        defaultMarker={{ latitude, longitude }}
                        scrollZoom={false}
                    />
                </div>
            );
        }
        return null;
    };

    /**
     * Render contract info
     *
     * @returns Contract info
     */
    const renderContractInfo = () => {
        if (dataset.contractStatus === 'ACCEPTED') {
            return <p>{strings.ownerContract}</p>;
        }
        if (contract && contract.datasetId === dataset.id && contract.status === 'ACCEPTED') {
            return <p>{strings.contractExists}</p>;
        }
        if (contract && contract.datasetId === dataset.id && contract.status === 'PENDING') {
            return (
                <>
                    <p>
                        {strings.notifyEmail}
                        <Link
                            to="/contracts"
                            className="text-blue-400"
                            onClick={() => onNav()}
                        >
                            &nbsp;
                            {strings.contractsPage}
                        </Link>
                    .
                    </p>
                </>
            );
        }
        return null;
    };

    /**
     * Render dataset actions
     *
     * @returns Button
     */
    const renderAction = () => {
        let request = true;
        if (dataset.contractStatus === 'ACCEPTED' || !dataset.policy.terms) {
            request = false;
        }
        if (contract && contract.datasetId === dataset.id && contract.status === 'ACCEPTED') {
            request = false;
        }
        let disableButton = false;
        if (contract && contract.datasetId === dataset.id && contract.status === 'PENDING') {
            disableButton = true;
        }
        if (!login.authenticated || login.status !== 'VERIFIED') {
            disableButton = true;
        }
        return (
            <div className="mt-16 bg-mainDark w-full text-white">
                <div className="px-2 sm:px-8 py-8">
                    {renderContractInfo()}
                    {!login.authenticated && (
                        <p>
                            {strings.youMust}
                            <Link to="/auth/signin" className="text-blue-400">{strings.signIn}</Link>
                            {strings.signInFirst}
                        </p>
                    )}
                    {login.authenticated && login.status !== 'VERIFIED' && <p>{strings.verifyFirst}</p>}
                    <div className="mt-8">
                        <Button
                            variant="contained"
                            color="primary"
                            size="large"
                            type="button"
                            endIcon={request ? <SpeakerNotesOutlined /> : <GetAppOutlined />}
                            onClick={() => handleGetDataset()}
                            disabled={disableButton}
                        >
                            {request ? strings.headerProposal : strings.buttonDownload}
                        </Button>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <>
            <div className="m-auto px-10 sm:px-16">
                {dataset && (
                    <div className="leading-loose">
                        <p>{`${dataset.metadata.survey.charAt(0)}${dataset.metadata.survey.substring(1).toLowerCase()}`}</p>
                        <h1>{dataset.metadata.datasetId}</h1>
                        <p className="font-light">
                            {`${strings.labelUploaded}: ${formatDate(dataset.metadata.createdAt, true)} ${dataset.metadata.createdAt !== dataset.metadata.modified ? `(${strings.modified}: ${formatDate(dataset.metadata.modified, true)})` : ''}`}
                        </p>
                        {dataset.metadata.description && (
                            <div className="mt-10 max-w-xl">
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
                                        :
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
                        {media.length > 0
                            && <img className="h-24 mt-6 mr-4 rounded cursor-pointer" alt="Thumbnail" src={`${process.env.REACT_APP_API_URL}/media/thumbnails/${media[0].mediaId}`} />}
                        <Metadata dataset={dataset} licenses={licenses} />
                        {renderGeoRef()}
                    </div>
                )}
                {error && <p className="error text-red-600 my-6">{strings.errorTryAgain}</p>}
                <CreateContract
                    open={openDialog}
                    dataset={dataset}
                    onClose={() => setOpenDialog(false)}
                    onSuccess={() => setContract(undefined)}
                />
                <ProgressIndicator open={action} />
            </div>
            {!hideActions && renderAction()}
        </>
    );
};

export default Dataset;
