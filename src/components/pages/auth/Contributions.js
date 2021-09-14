import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import useFetch from '../../../hooks/useFetch';
import strings from '../../../strings';
import Dataset from '../Dataset';
import ContributionList from '../../components/lists/ContributionList';

/**
 * Show list of datasets uploaded by the user
 */
const Contributions = ({ onNav }) => {
    const { id } = useParams();
    const datasets = useFetch(`${process.env.REACT_APP_API_URL}/datasets/metadata/user/this`);
    const licenses = useFetch(`${process.env.REACT_APP_API_URL}/db/licenses`);
    const [dataset, setDataset] = useState(undefined);

    /**
     * Scroll to top on page load and set selected dataset
     */
    useEffect(() => {
        window.scrollTo(0, 0);
        if (datasets && datasets.length > 0) {
            if (id) {
                setDataset(datasets.find((element) => element.metadata.datasetId === id));
            } else setDataset(datasets[0]);
        }
    }, [id, datasets]);

    return (
        <div className="pb-24 pt-4 sm:pt-24 w-full relative m-auto">
            {datasets.length > 0 ? (
                <div className="lg:flex xl:w-10/12 m-auto">
                    <div className="w-96 px-2">
                        <h1 className="font-light text-2xl mb-2">
                            {strings.headerDatasets}
                        </h1>
                        <ContributionList datasets={datasets} dataset={dataset} />
                    </div>
                    {dataset && (
                        <div className="flex-1 px-2 xl:ml-8">
                            <Dataset
                                dataset={dataset}
                                licenses={licenses}
                                hideActions
                            />
                        </div>
                    )}
                </div>
            ) : (
                <div className="text-center">
                    <p>{strings.noContributions}</p>
                    <p>{strings.justSubmitted}</p>
                    <p className="mt-4">
                        {strings.goTo}
                        <Link
                            to="/submit"
                            className="text-blue-400"
                            onClick={() => onNav()}
                        >
                            {strings.submitPage}
                        </Link>
                        {strings.toSubmit}
                    </p>
                </div>
            )}
        </div>
    );
};

export default Contributions;
