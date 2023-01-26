import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import DownloadButton from './DownloadButton';
import LoginContext from '../../../context/LoginContext';
import strings from '../../../strings';

const loginStateTrue = {
    authenticated: true,
    orcid: undefined,
    name: undefined,
    email: undefined,
    organization: undefined,
    role: undefined,
};

const loginValueTrue = { login: loginStateTrue, setLogin: jest.fn() };

const loginStateFalse = {
    authenticated: false,
    orcid: undefined,
    name: undefined,
    email: undefined,
    organization: undefined,
    role: undefined,
};

const loginValueFalse = { login: loginStateFalse, setLogin: jest.fn() };

afterEach(() => {
    cleanup();
});

describe('Render Nav', () => {
    describe('with an accepted contract', () => {
        test('should render text', () => {
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
            const contract = {
                datasetId: 'OS-2020-2021-NO-940881',
                status: 'ACCEPTED',
            };
            render(
                <BrowserRouter>
                    <LoginContext.Provider value={loginValueTrue}>
                        <DownloadButton
                            dataset={dataset}
                            contract={contract}
                            onNav={jest.fn()}
                            onDownload={jest.fn()}
                        />
                    </LoginContext.Provider>
                </BrowserRouter>,
            );
            const text = screen.getByText(strings.buttonDownload);
            expect(text).toBeInTheDocument();
        });
    });
    describe('with a pending contract', () => {
        test('should render text', () => {
            const dataset = {
                id: 'OS-2020-2021-NO-940881',
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
            const contract = {
                datasetId: 'OS-2020-2021-NO-940881',
                status: 'PENDING',
            };
            render(
                <BrowserRouter>
                    <LoginContext.Provider value={loginValueTrue}>
                        <DownloadButton
                            dataset={dataset}
                            contract={contract}
                            onNav={jest.fn()}
                            onDownload={jest.fn()}
                        />
                    </LoginContext.Provider>
                </BrowserRouter>,
            );
            const text = screen.getByText(strings.headerProposal);
            expect(text).toBeInTheDocument();
        });
    });
    describe('with no contract info', () => {
        test('should render text', () => {
            const dataset = {
                id: 'OS-2020-2021-NO-940881',
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
            const contract = {};
            render(
                <BrowserRouter>
                    <LoginContext.Provider value={loginValueFalse}>
                        <DownloadButton
                            dataset={dataset}
                            contract={contract}
                            onNav={jest.fn()}
                            onDownload={jest.fn()}
                        />
                    </LoginContext.Provider>
                </BrowserRouter>,
            );
            const text = screen.getByText(strings.headerProposal);
            expect(text).toBeInTheDocument();
        });
    });
});
