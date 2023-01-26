import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';
import Profile from './Profile';
import LoginContext from '../../../context/LoginContext';
import strings from '../../../strings';

const loginState = {
    authenticated: false,
    orcid: undefined,
    name: undefined,
    email: undefined,
    organization: undefined,
    role: undefined,
};

const loginValue = { login: loginState, setLogin: jest.fn() };

const loginStateAdmin = {
    authenticated: true,
    orcid: undefined,
    name: undefined,
    email: undefined,
    organization: undefined,
    role: 'ADMIN',
};

const loginValueAdmin = { login: loginStateAdmin, setLogin: jest.fn() };

afterEach(() => {
    cleanup();
});

describe('Render Profile', () => {
    describe('with a user that is not an admin', () => {
        test('should render text', () => {
            render(
                <LoginContext.Provider value={loginValue}>
                    <Profile triggerFeedback={1} />
                </LoginContext.Provider>,
            );
            const text1 = screen.getByText(strings.unaffiliated);
            const text2 = screen.getByText(strings.changeAffiliation);
            const text3 = screen.getByText(strings.buttonDeleteProfile);
            expect(text1).toBeInTheDocument();
            expect(text2).toBeInTheDocument();
            expect(text3).toBeInTheDocument();
        });
    });
    describe('with a user that is an admin', () => {
        test('should render text', () => {
            render(
                <LoginContext.Provider value={loginValueAdmin}>
                    <Profile triggerFeedback={1} />
                </LoginContext.Provider>,
            );
            const text1 = screen.getByText(strings.unaffiliated);
            const text2 = screen.getByText(strings.changeAffiliation);
            const text3 = screen.getByText(strings.buttonDeleteProfile);
            expect(text1).toBeInTheDocument();
            expect(text2).toBeInTheDocument();
            expect(text3).toBeInTheDocument();
        });
    });
});
