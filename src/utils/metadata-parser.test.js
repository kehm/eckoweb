import {
    getDatasetCoordinates,
    parseContinents,
    parseCountries,
    parseGeoReference,
    parseLanguages,
} from './metadata-parser';

describe('Call function parseCountries', () => {
    test('should stringified language list', () => {
        const arr = [
            'NO',
            'SE',
            'DK',
        ];
        const countries = parseCountries(arr);
        expect(countries).toEqual('Norway, Sweden, Denmark');
    });
});

describe('Call function parseContinents', () => {
    test('should stringified language list', () => {
        const arr = [
            'AF',
            'EU',
        ];
        const continents = parseContinents(arr);
        expect(continents).toEqual('Africa, Europe');
    });
});

describe('Call function parseLanguages', () => {
    test('should stringified language list', () => {
        const arr = [
            'NO',
            'EN',
        ];
        const languages = parseLanguages(arr);
        expect(languages).toEqual('Norwegian, English');
    });
});

describe('Call function parseGeoReference', () => {
    describe('with valid JSON', () => {
        test('should return latitude and longitude', () => {
            const geoRef = [1.1, 2.2];
            const coordinates = parseGeoReference(JSON.stringify(geoRef));
            expect(coordinates.latitude).toEqual(1.1);
            expect(coordinates.longitude).toEqual(2.2);
        });
    });
    describe('with invalid JSON', () => {
        test('should throw error', () => {
            const geoRef = '1.1, 2.2';
            expect(() => parseGeoReference(
                geoRef,
            )).toThrowError();
        });
    });
});

describe('Call function getDatasetCoordinates', () => {
    test('should return array of coordinates', () => {
        const datasets = [
            {
                id: 'OS-2020-2021-NO-940881',
                geoReference: JSON.stringify([1.1, 2.2]),
            },
            {
                id: 'RE-2020-2021-NO-940881',
                geoReference: JSON.stringify([10.1, 20.2]),
            },
        ];
        const coordinates = getDatasetCoordinates(datasets);
        expect(coordinates.length).toEqual(2);
        expect(coordinates[0].id).toEqual('OS-2020-2021-NO-940881');
        expect(coordinates[0].latitude).toEqual(1.1);
        expect(coordinates[0].longitude).toEqual(2.2);
        expect(coordinates[1].id).toEqual('RE-2020-2021-NO-940881');
        expect(coordinates[1].latitude).toEqual(10.1);
        expect(coordinates[1].longitude).toEqual(20.2);
    });
});
