import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import LoginContext from '../../context/LoginContext';
import Nav from './Nav';
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

afterEach(() => {
    cleanup();
});

describe('Render Nav', () => {
    test('should render text', () => {
        render(
            <BrowserRouter>
                <LoginContext.Provider value={loginValue}>
                    <Nav
                        secondaryNav={0}
                        onClickSignOut={jest.fn()}
                        feedbackTrigger={0}
                    />
                </LoginContext.Provider>
            </BrowserRouter>,
        );
        const text1 = screen.getByText(strings.siteSubTitle);
        const text2 = screen.getByText(strings.navHome);
        const text3 = screen.getByText(strings.navAbout);
        const text4 = screen.getByText(strings.navDatasets);
        const text5 = screen.getByText(strings.navContribute);
        expect(text1).toBeInTheDocument();
        expect(text2).toBeInTheDocument();
        expect(text3).toBeInTheDocument();
        expect(text4).toBeInTheDocument();
        expect(text5).toBeInTheDocument();
    });
});
