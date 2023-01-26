import filterMetadata from './filter-metadata';

describe('Call function filterMetadata', () => {
    describe('with all filter', () => {
        test('should return resurvey', () => {
            const metadata = [
                {
                    datasetId: 'OS-2020-2021-NO-940881',
                    countries: 'NO',
                    continents: 'EU',
                    habitats: 'hab123',
                    taxa: 'tax123',
                    earliestYearCollected: 2020,
                    latestYearCollected: 2022,
                    survey: 'Original',
                },
                {
                    datasetId: 'RE-2020-2021-NO-940881',
                    countries: 'NO',
                    continents: 'EU',
                    habitats: 'hab123',
                    taxa: 'tax123',
                    earliestYearCollected: 2020,
                    latestYearCollected: 2022,
                    survey: 'Resurvey',
                },
            ];
            const values = {
                datasetId: 'RE-2020-2021-NO-940881',
                countries: 'NO',
                continents: 'EU',
                habitats: 'hab123',
                taxa: 'tax123',
                earliestYearCollected: 2020,
                latestYearCollected: 2022,
                survey: 'Resurvey',
            };
            const sets = filterMetadata(metadata, values);
            expect(sets).toEqual([metadata[1]]);
        });
    });
    describe('with survey filter', () => {
        test('should return resurvey', () => {
            const metadata = [
                {
                    datasetId: 'OS-2020-2021-NO-940881',
                    countries: 'NO',
                    continents: 'EU',
                    habitats: 'hab123',
                    taxa: 'tax123',
                    earliestYearCollected: 2020,
                    latestYearCollected: 2022,
                    survey: 'Original',
                },
                {
                    datasetId: 'RE-2020-2021-NO-940881',
                    countries: 'NO',
                    continents: 'EU',
                    habitats: 'hab123',
                    taxa: 'tax123',
                    earliestYearCollected: 2020,
                    latestYearCollected: 2022,
                    survey: 'Resurvey',
                },
            ];
            const values = {
                survey: 'Resurvey',
            };
            const sets = filterMetadata(metadata, values);
            expect(sets).toEqual([metadata[1]]);
        });
    });
    describe('with no filter', () => {
        test('should return all data', () => {
            const metadata = [
                {
                    datasetId: 'OS-2020-2021-NO-940881',
                    countries: 'NO',
                    continents: 'EU',
                    habitats: 'hab123',
                    taxa: 'tax123',
                    earliestYearCollected: 2020,
                    latestYearCollected: 2022,
                    survey: 'Original',
                },
                {
                    datasetId: 'RE-2020-2021-NO-940881',
                    countries: 'NO',
                    continents: 'EU',
                    habitats: 'hab123',
                    taxa: 'tax123',
                    earliestYearCollected: 2020,
                    latestYearCollected: 2022,
                    survey: 'Resurvey',
                },
            ];
            const values = {};
            const sets = filterMetadata(metadata, values);
            expect(sets).toEqual(metadata);
        });
    });
});
