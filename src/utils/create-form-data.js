/**
 * Create FormData object
 *
 * @param {Object} data Form data
 */
const createFormData = (data) => {
    const formData = new FormData();
    if (data.contributors) {
        data.contributors.forEach((contributor, index) => {
            formData.append(`contributors[${index}]`, contributor);
        });
    }
    if (data.countries) {
        data.countries.forEach((country, index) => {
            formData.append(`countries[${index}]`, country);
        });
    }
    if (data.continents) {
        data.continents.forEach((continent, index) => {
            formData.append(`continents[${index}]`, continent);
        });
    }
    if (data.languages) {
        data.languages.forEach((language, index) => {
            formData.append(`languages[${index}]`, language);
        });
    }
    if (data.references) {
        data.references.forEach((reference, index) => {
            formData.append(`references[${index}]`, reference);
        });
    }
    if (data.habitats) {
        data.habitats.forEach((habitat, index) => {
            formData.append(`habitats[${index}]`, habitat);
        });
    }
    if (data.taxa) {
        data.taxa.forEach((taxon, index) => {
            formData.append(`taxa[${index}]`, taxon);
        });
    }
    if (data.spatialExtent && data.spatialExtent[0] !== '') {
        data.spatialExtent.forEach((spatialExtent, index) => {
            formData.append(`spatialExtent[${index}]`, spatialExtent);
        });
    }
    if (data.geoReference) {
        data.geoReference.forEach((geoReference, index) => {
            formData.append(`geoReference[${index}]`, geoReference);
        });
    }
    if (data.collectionId && data.collectionId !== '') formData.append('collectionId', data.collectionId);
    if (data.description && data.description !== '') formData.append('description', data.description);
    if (data.earliestYearCollected && data.earliestYearCollected !== '') formData.append('earliestYearCollected', data.earliestYearCollected);
    if (data.latestYearCollected && data.latestYearCollected !== '') formData.append('latestYearCollected', data.latestYearCollected);
    if (data.geodeticDatum && data.geodeticDatum !== '') formData.append('geodeticDatum', data.geodeticDatum);
    if (data.latitude && data.latitude !== '') formData.append('latitude', data.latitude);
    if (data.license && data.license !== '') formData.append('license', data.license);
    if (data.locationRemarks && data.locationRemarks !== '') formData.append('locationRemarks', data.locationRemarks);
    if (data.measurementRemarks && data.measurementRemarks !== '') formData.append('measurementRemarks', data.measurementRemarks);
    if (data.parentEventId && data.parentEventId !== '') formData.append('parentEventId', data.parentEventId);
    if (data.plotNumber && data.plotNumber !== '') formData.append('plotNumber', data.plotNumber);
    if (data.terms && data.terms !== '') formData.append('terms', data.terms);
    if (data.restrictionType && data.restrictionType !== '') formData.append('restrictionType', data.restrictionType);
    if (data.sampleSizeUnit && data.sampleSizeUnit !== '') formData.append('sampleSizeUnit', data.sampleSizeUnit);
    if (data.sampleSizeValue && data.sampleSizeValue !== '') formData.append('sampleSizeValue', data.sampleSizeValue);
    if (data.samplingProtocol && data.samplingProtocol !== '') formData.append('samplingProtocol', data.samplingProtocol);
    if (data.samplingProtocolReference && data.samplingProtocolReference !== '') formData.append('samplingProtocolReference', data.samplingProtocolReference);
    if (data.speciesNumber && data.speciesNumber !== '') formData.append('speciesNumber', data.speciesNumber);
    if (data.survey && data.survey !== '') formData.append('survey', data.survey);
    formData.append('dataset', data.datasetFile[0]);
    formData.append('media', data.image[0]);
    return formData;
};

export default createFormData;
