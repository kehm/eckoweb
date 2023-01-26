import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';
import Metadata from './Metadata';

afterEach(() => {
    cleanup();
});

describe('Render Metadata', () => {
    describe('with a dataset with metadata', () => {
        test('should render license text', () => {
            const dataset = {
                id: 'OS-2020-2021-NO-940881',
                contractStatus: 'ACCEPTED',
                geoReference: 'test',
                bibliographicCitation: 'Smith et al. (2021)',
                contributors: [
                    'John Smith',
                    'Jane Doe',
                ],
                policy: {
                    license: 'CCBY40',
                },
                metadata: {
                    datasetId: 'OS-2020-2021-NO-940881',
                    description: 'test',
                    collectionId: 'test',
                    parentEventId: 'test',
                    survey: 'Resurvey',
                    earliestYearCollected: 2020,
                    latestYearCollected: 2022,
                    speciesNumber: 20,
                    sampleSizeValue: 2,
                    sampleSizeUnit: 'm',
                    samplingProtocol: 'test',
                    samplingProtocolReference: 'test',
                    measurementRemarks: 'test',
                    spatialExtent: 'test',
                    geodeticDatum: 'test',
                    locationRemarks: 'test',
                    languages: [
                        'NO',
                        'EN',
                    ],
                    countries: [
                        'NO',
                        'SE',
                    ],
                    continents: [
                        'EU',
                    ],
                    taxa: [
                        'test',
                    ],
                    habitats: [
                        'test',
                    ],
                    references: [
                        'test',
                    ],
                },
            };
            const licenses = [
                {
                    code: 'CCBY40',
                    name: 'CC BY 4.0',
                    description: 'Creative Commons Attribution 4.0 International',
                    url: 'https://creativecommons.org/licenses/by/4.0/',
                },
                {
                    code: 'CCBYSA40',
                    name: 'CC BY-SA 4.0',
                    description: 'Creative Commons Attribution-ShareAlike 4.0 International',
                    url: 'https://creativecommons.org/licenses/by-sa/4.0/',
                },
            ];
            render(
                <Metadata dataset={dataset} licenses={licenses} />,
            );
            const text1 = screen.queryByText('License:');
            const text2 = screen.queryByText('CC BY 4.0');
            expect(text1).toBeInTheDocument();
            expect(text2).toBeInTheDocument();
        });
    });
    describe('with a dataset with metadata and no license', () => {
        test('should not render license text', () => {
            const dataset = {
                id: 'OS-2020-2021-NO-940881',
                contractStatus: 'ACCEPTED',
                geoReference: 'test',
                bibliographicCitation: 'Smith et al. (2021)',
                contributors: [
                    'John Smith',
                    'Jane Doe',
                ],
                policy: {
                    terms: 'test',
                },
                metadata: {
                    datasetId: 'OS-2020-2021-NO-940881',
                    description: 'test',
                    collectionId: 'test',
                    parentEventId: 'test',
                    survey: 'Resurvey',
                    earliestYearCollected: 2020,
                    latestYearCollected: 2020,
                },
            };
            const licenses = [
                {
                    code: 'CCBY40',
                    name: 'CC BY 4.0',
                    description: 'Creative Commons Attribution 4.0 International',
                    url: 'https://creativecommons.org/licenses/by/4.0/',
                },
                {
                    code: 'CCBYSA40',
                    name: 'CC BY-SA 4.0',
                    description: 'Creative Commons Attribution-ShareAlike 4.0 International',
                    url: 'https://creativecommons.org/licenses/by-sa/4.0/',
                },
            ];
            render(
                <Metadata dataset={dataset} licenses={licenses} />,
            );
            const text1 = screen.queryByText('License:');
            const text2 = screen.queryByText('CC BY 4.0');
            const text3 = screen.getByText('Sample year(s):');
            expect(text1).not.toBeInTheDocument();
            expect(text2).not.toBeInTheDocument();
            expect(text3).toBeInTheDocument();
        });
    });
    describe('with a dataset without metadata', () => {
        test('should not render license text', () => {
            const dataset = {
                id: 'OS-2020-2021-NO-940881',
                contractStatus: 'ACCEPTED',
                geoReference: 'test',
                policy: {
                    license: 'CCBY40',
                },
            };
            const licenses = [
                {
                    code: 'CCBY40',
                    name: 'CC BY 4.0',
                    description: 'Creative Commons Attribution 4.0 International',
                    url: 'https://creativecommons.org/licenses/by/4.0/',
                },
                {
                    code: 'CCBYSA40',
                    name: 'CC BY-SA 4.0',
                    description: 'Creative Commons Attribution-ShareAlike 4.0 International',
                    url: 'https://creativecommons.org/licenses/by-sa/4.0/',
                },
            ];
            render(
                <Metadata dataset={dataset} licenses={licenses} />,
            );
            const text1 = screen.queryByText('License:');
            const text2 = screen.queryByText('CC BY 4.0');
            expect(text1).not.toBeInTheDocument();
            expect(text2).not.toBeInTheDocument();
        });
    });
});
