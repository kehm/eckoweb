import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import strings from '../../strings';
import useFetch from '../../hooks/useFetch';
import Filter from '../dialogs/Filter';
import filterMetadata from '../../utils/filter-metadata';
import Dataset from './Dataset';
import DatasetList from '../components/lists/DatasetList';

/**
 * Show list of available datasets
 */
const Datasets = ({ onNav, onPageView }) => {
    const { id } = useParams();
    const datasets = useFetch(`${process.env.REACT_APP_API_URL}/datasets/metadata`);
    const licenses = useFetch(`${process.env.REACT_APP_API_URL}/db/licenses`);
    const [metadata, setMetadata] = useState([]);
    const [dataList, setDataList] = useState([]);
    const [empty, setEmpty] = useState(false);
    const [openFilter, setOpenFilter] = useState(false);
    const [filterActive, setFilterActive] = useState(false);
    const [dataset, setDataset] = useState(undefined);

    /**
     * Scroll to top on page load
     */
    useEffect(() => {
        onPageView(id || strings.navDatasets);
        window.scrollTo(0, 0);
        if (datasets && datasets.length > 0) {
            if (id) {
                setDataset(datasets.find((element) => element.metadata.datasetId === id));
            } else setDataset(datasets[0]);
        }
    }, [id, datasets]);

    /**
     * Set dataset list or show empty string
     */
    useEffect(() => {
        if (datasets && datasets.length > 0) {
            setEmpty(false);
            const tmp = datasets.map((element) => element.metadata);
            setMetadata(tmp);
            setDataList(tmp);
        }
    }, [datasets]);

    /**
     * Clear filter
     */
    useEffect(() => {
        if (!filterActive && metadata.length > 0) setDataList(metadata);
    }, [filterActive]);

    /**
     * Apply filter to dataset list
     */
    const applyFilter = (values) => {
        const sets = filterMetadata(metadata, values);
        setDataList(sets);
        setFilterActive(true);
    };

    return (
        <div className="w-full">
            <div className="lg:flex m-auto">
                <div className="w-96 px-2 pl-6 py-10 relative">
                    <div className="ml-2 mb-2">
                        <h1 className="font-light text-2xl mb-2 ml-1">
                            {strings.headerDatasets}
                        </h1>
                        <span className="hidden sm:inline absolute right-2 top-10 text-blue-400">
                            <Button
                                variant="text"
                                color={filterActive ? 'primary' : 'inherit'}
                                size="medium"
                                type="button"
                                onClick={() => setOpenFilter(true)}
                            >
                                {strings.filterShow}
                            </Button>
                        </span>
                        {filterActive && (
                            <span className="ml-2">
                                <Button
                                    variant="text"
                                    color="inherit"
                                    size="medium"
                                    type="button"
                                    onClick={() => setFilterActive(false)}
                                >
                                    {strings.filterRemove}
                                </Button>
                            </span>
                        )}
                    </div>
                    {empty && <p className="error mb-4 text-red-600">{strings.errorDatasets}</p>}
                    <DatasetList datasets={dataList} dataset={dataset} />
                </div>
                {dataset && (
                    <div className="flex-1 pt-10 bg-white">
                        <Dataset
                            dataset={dataset}
                            licenses={licenses}
                            onNav={() => onNav()}
                        />
                    </div>
                )}
            </div>
            <Filter
                openDialog={openFilter}
                onClose={() => setOpenFilter(false)}
                onUpdate={(values) => applyFilter(values)}
            />
        </div>
    );
};

export default Datasets;
