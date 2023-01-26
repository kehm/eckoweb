import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';
import SignIn from './SignIn';
import strings from '../../strings';
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

afterEach(() => {
    cleanup();
});

describe('Render SignIn', () => {
    describe('with no error', () => {
        test('should render text', () => {
            const props = {
                match: {
                    params: {
                        status: 'signin',
                    },
                },
            };
            render(
                <LoginContext.Provider value={loginValue}>
                    <SignIn props={props} onPageView={jest.fn()} />
                </LoginContext.Provider>,
            );
            const text1 = screen.getByText(strings.orcidSignIn);
            const text2 = screen.getByText(strings.signInInfo);
            const text3 = screen.getByText(strings.registerNow);
            expect(text1).toBeInTheDocument();
            expect(text2).toBeInTheDocument();
            expect(text3).toBeInTheDocument();
        });
    });
    describe('with status error', () => {
        test('should render text', () => {
            const props = {
                match: {
                    params: {
                        status: 'error',
                    },
                },
            };
            render(
                <LoginContext.Provider value={loginValue}>
                    <SignIn props={props} onPageView={jest.fn()} />
                </LoginContext.Provider>,
            );
            const text1 = screen.getByText(strings.orcidSignIn);
            const text2 = screen.getByText(strings.signInInfo);
            const text3 = screen.getByText(strings.registerNow);
            const text4 = screen.getByText(strings.errorSignIn);
            expect(text1).toBeInTheDocument();
            expect(text2).toBeInTheDocument();
            expect(text3).toBeInTheDocument();
            expect(text4).toBeInTheDocument();
        });
    });
    describe('with status signup', () => {
        test('should render text', () => {
            const props = {
                match: {
                    params: {
                        status: 'signup',
                    },
                },
            };
            render(
                <LoginContext.Provider value={loginValue}>
                    <SignIn props={props} onPageView={jest.fn()} />
                </LoginContext.Provider>,
            );
            const text1 = screen.getByText(strings.welcome);
            const text2 = screen.getByText(strings.orcidSuccess);
            const text3 = screen.getByText(strings.buttonRegister);
            expect(text1).toBeInTheDocument();
            expect(text2).toBeInTheDocument();
            expect(text3).toBeInTheDocument();
        });
    });
});
