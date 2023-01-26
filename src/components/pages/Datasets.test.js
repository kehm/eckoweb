import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import Datasets from './Datasets';
import LoginContext from '../../context/LoginContext';
import strings from '../../strings';

const loginState = {
    authenticated: false,
    orcid: undefined,
    name: undefined,
    email: undefined,
    organization: undefined,
    role: undefined,
};

const loginValue = { login: loginState, setLogin: jest.fn() };

jest.mock('../components/Map', () => () => <div />);
jest.mock('../components/MiniMap', () => () => <div />);

window.scrollTo = jest.fn();

afterEach(() => {
    cleanup();
});

describe('Render Datasets', () => {
    describe('with show map true', () => {
        test('should render text', () => {
            render(
                <BrowserRouter>
                    <LoginContext.Provider value={loginValue}>
                        <Datasets
                            showMap
                            onNav={jest.fn()}
                            onPageView={jest.fn()}

                        />
                    </LoginContext.Provider>
                </BrowserRouter>,
            );
            const text = screen.getByText(strings.headerDatasets);
            expect(text).toBeInTheDocument();
        });
    });
});
