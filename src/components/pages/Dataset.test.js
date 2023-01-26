import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import Dataset from './Dataset';
import LoginContext from '../../context/LoginContext';

const loginState = {
    authenticated: false,
    orcid: undefined,
    name: undefined,
    email: undefined,
    organization: undefined,
    role: undefined,
};

const loginValue = { login: loginState, setLogin: jest.fn() };

jest.mock('../components/MiniMap', () => () => <div />);

window.scrollTo = jest.fn();

afterEach(() => {
    cleanup();
});

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

describe('Render Dataset', () => {
    describe('with hide actions true', () => {
        test('should render text', () => {
            render(
                <BrowserRouter>
                    <LoginContext.Provider value={loginValue}>
                        <Dataset
                            dataset={dataset}
                            licenses={licenses}
                            hideActions
                            onNav={jest.fn()}
                        />
                    </LoginContext.Provider>
                </BrowserRouter>,
            );
            const text = screen.queryByText('OS-2020-2021-NO-940881');
            expect(text).toBeInTheDocument();
        });
    });
    describe('with hide actions false', () => {
        test('should render text', () => {
            render(
                <BrowserRouter>
                    <LoginContext.Provider value={loginValue}>
                        <Dataset
                            dataset={dataset}
                            licenses={licenses}
                            onNav={jest.fn()}
                        />
                    </LoginContext.Provider>
                </BrowserRouter>,
            );
            const text = screen.queryByText('OS-2020-2021-NO-940881');
            expect(text).toBeInTheDocument();
        });
    });
});
