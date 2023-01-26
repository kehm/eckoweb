import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';
import LoginContext from '../../context/LoginContext';
import MobileDrawer from './MobileDrawer';

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

describe('Render MobileDrawer', () => {
    describe('with an authenticated user and selected about nav', () => {
        test('should render drawer', () => {
            render(
                <LoginContext.Provider value={loginValueTrue}>
                    <MobileDrawer
                        selected={1}
                        onSelect={jest.fn()}
                        onClickSignOut={jest.fn()}
                    />
                </LoginContext.Provider>,
            );
            const component = screen.getByLabelText('open');
            expect(component).toBeInTheDocument();
        });
    });
    describe('with an authenticated user and selected contracts nav', () => {
        test('should render drawer', () => {
            render(
                <LoginContext.Provider value={loginValueTrue}>
                    <MobileDrawer
                        selected={4}
                        onSelect={jest.fn()}
                        onClickSignOut={jest.fn()}
                    />
                </LoginContext.Provider>,
            );
            const component = screen.getByLabelText('open');
            expect(component).toBeInTheDocument();
        });
    });
    describe('with an authenticated user and selected contributions nav', () => {
        test('should render drawer', () => {
            render(
                <LoginContext.Provider value={loginValueTrue}>
                    <MobileDrawer
                        selected={5}
                        onSelect={jest.fn()}
                        onClickSignOut={jest.fn()}
                    />
                </LoginContext.Provider>,
            );
            const component = screen.getByLabelText('open');
            expect(component).toBeInTheDocument();
        });
    });
    describe('with an authenticated user and selected profile nav', () => {
        test('should render drawer', () => {
            render(
                <LoginContext.Provider value={loginValueTrue}>
                    <MobileDrawer
                        selected={6}
                        onSelect={jest.fn()}
                        onClickSignOut={jest.fn()}
                    />
                </LoginContext.Provider>,
            );
            const component = screen.getByLabelText('open');
            expect(component).toBeInTheDocument();
        });
    });
    describe('with a user that is not authenticated and selected datasets nav', () => {
        test('should render drawer', () => {
            render(
                <LoginContext.Provider value={loginValueFalse}>
                    <MobileDrawer
                        selected={2}
                        onSelect={jest.fn()}
                        onClickSignOut={jest.fn()}
                    />
                </LoginContext.Provider>,
            );
            const component = screen.getByLabelText('open');
            expect(component).toBeInTheDocument();
        });
    });
    describe('with a user that is not authenticated and selected contribute nav', () => {
        test('should render drawer', () => {
            render(
                <LoginContext.Provider value={loginValueFalse}>
                    <MobileDrawer
                        selected={3}
                        onSelect={jest.fn()}
                        onClickSignOut={jest.fn()}
                    />
                </LoginContext.Provider>,
            );
            const component = screen.getByLabelText('open');
            expect(component).toBeInTheDocument();
        });
    });
});
