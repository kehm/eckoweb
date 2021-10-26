import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import strings from '../../strings';
import useFetch from '../../hooks/useFetch';
import Filter from '../dialogs/Filter';
import filterMetadata from '../../utils/filter-metadata';
import Dataset from './Dataset';
import DatasetList from '../components/lists/DatasetList';
import Map from '../components/Map';
import { getDatasetCoordinates } from '../../utils/metadata-parser';

/**
 * Show list of available datasets
 */
const Datasets = ({ showMap, onNav, onPageView }) => {
    const { id } = useParams();
    const history = useHistory();
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
        if (id && datasets && datasets.length > 0) {
            setDataset(datasets.find((element) => element.metadata.datasetId === id));
        } else setDataset(undefined);
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

    /**
     * Render list header
     *
     * @returns JSX
     */
    const renderListHeader = () => (
        <>
            <h1 className="font-light text-2xl ml-2 mt-2">
                {strings.headerDatasets}
            </h1>
            <span className="absolute right-2 top-0 lg:top-14 text-blue-400">
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
                <span className="ml-2 absolute right-20 top-0 lg:top-14">
                    <Button
                        variant="text"
                        color="inherit"
                        size="medium"
                        type="button"
                        onClick={() => setFilterActive(false)}
                    >
                        {strings.buttonReset}
                    </Button>
                </span>
            )}
        </>
    );

    /**
     * Render dataset list
     *
     * @returns JSX
     */
    const renderList = () => (
        <div className={`lg:py-10 relative ${id ? 'w-96' : 'w-full md:w-2/3 lg:w-1/2 m-auto'}`}>
            {renderListHeader()}
            {empty && <p className="error mb-4 text-red-600">{strings.errorDatasets}</p>}
            <DatasetList
                datasets={dataList}
                dataset={dataset}
            />
        </div>
    );

    return (
        <>
            {!id && showMap && (
                <div className="hidden md:inline">
                    <Map
                        height="450px"
                        markers={datasets && getDatasetCoordinates(datasets)}
                        onClickMarker={(marker) => history.push(`/datasets/${marker}`)}
                    />
                </div>
            )}
            <div className="md:ml-2 pb-8">
                {dataset ? (
                    <Dataset
                        dataset={dataset}
                        licenses={licenses}
                        onNav={() => onNav()}
                    />
                ) : renderList()}
            </div>
            <Filter
                openDialog={openFilter}
                onClose={() => setOpenFilter(false)}
                onUpdate={(values) => applyFilter(values)}
            />
        </>
    );
};

export default Datasets;
