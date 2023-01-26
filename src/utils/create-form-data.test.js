import createFormData from './create-form-data';

describe('Call function createFormData', () => {
    describe('with all optional parameters', () => {
        test('should return form data', () => {
            const form = {
                contributors: [
                    'John Smith',
                    'Jane Doe',
                ],
                countries: [
                    'NO',
                    'DK',
                ],
                continents: [
                    'EU',
                ],
                languages: [
                    'EN',
                    'NO',
                ],
                references: [
                    'ref123',
                ],
                habitats: [
                    'hab123',
                ],
                taxa: [
                    'tax123',
                ],
                spatialExtent: [
                    'ext123',
                ],
                geoReference: [
                    1,
                    2,
                ],
                collectionId: 'test',
                description: 'test',
                earliestYearCollected: 2020,
                latestYearCollected: 2022,
                geodeticDatum: 'test',
                latitude: 'test',
                license: 'CC',
                locationRemarks: 'test',
                measurementRemarks: 'test',
                parentEventId: 'test',
                plotNumber: 'test',
                terms: 'test',
                restrictionType: 'test',
                sampleSizeUnit: 'test',
                sampleSizeValue: 'test',
                samplingProtocol: 'test',
                samplingProtocolReference: 'test',
                speciesNumber: 200,
                survey: 'Resurvey',
                datasetFile: [
                    { file: 'test' },
                ],
                image: [
                    { file: 'test' },
                ],
            };
            const iterator = createFormData(form).entries();
            let counter = 0;
            let object = iterator.next();
            while (!object.done) {
                counter += 1;
                object = iterator.next();
            }
            expect(counter).toEqual(34);
        });
    });
    describe('with no optional parameters', () => {
        test('should return form data', () => {
            const form = {
                datasetFile: [
                    { file: 'test' },
                ],
                image: [
                    { file: 'test' },
                ],
            };
            const iterator = createFormData(form).entries();
            let counter = 0;
            let object = iterator.next();
            while (!object.done) {
                counter += 1;
                object = iterator.next();
            }
            expect(counter).toEqual(2);
        });
    });
});
