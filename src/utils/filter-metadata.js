/**
 * Filter metadata array
 *
 * @param {Array} metadata Metadata array
 * @param {Object} values Filter values
 */
const filterMetadata = (metadata, values) => {
    let sets = [...metadata];
    if (values.datasetId && values.datasetId !== '') {
        sets = sets.filter((value) => value.datasetId
            && value.datasetId.toUpperCase().includes(values.datasetId.toUpperCase()));
    }
    if (values.survey && values.survey !== '') {
        sets = sets.filter((value) => value.survey
            && value.survey.toUpperCase().includes(values.survey.toUpperCase()));
    }
    if (values.countries && values.countries !== '') {
        sets = sets.filter((value) => value.countries
            && JSON.stringify(value.countries).toUpperCase()
                .includes(values.countries.toUpperCase()));
    }
    if (values.continents && values.continents !== '') {
        sets = sets.filter((value) => value.continents
            && JSON.stringify(value.continents).toUpperCase()
                .includes(values.continents.toUpperCase()));
    }
    if (values.taxa && values.taxa !== '') {
        sets = sets.filter((value) => value.taxa
            && JSON.stringify(value.taxa).toUpperCase().includes(values.taxa.toUpperCase()));
    }
    if (values.habitats && values.habitats !== '') {
        sets = sets.filter((value) => value.habitats
            && JSON.stringify(value.habitats).toUpperCase()
                .includes(values.habitats.toUpperCase()));
    }
    if (values.earliestYearCollected && values.earliestYearCollected !== '') {
        sets = sets.filter((value) => value.earliestYearCollected
            && `${value.earliestYearCollected}`.includes(values.earliestYearCollected));
    }
    if (values.latestYearCollected && values.latestYearCollected !== '') {
        sets = sets.filter((value) => value.latestYearCollected
            && `${value.latestYearCollected}`.includes(values.latestYearCollected));
    }
    return sets;
};

export default filterMetadata;
