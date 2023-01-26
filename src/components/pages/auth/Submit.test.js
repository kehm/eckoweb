import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';
import LoginContext from '../../../context/LoginContext';
import strings from '../../../strings';
import Submit from './Submit';

const loginState = {
    authenticated: true,
    orcid: undefined,
    name: undefined,
    email: undefined,
    organization: undefined,
    role: 'MEMBER',
};

const loginValue = { login: loginState, setLogin: jest.fn() };

jest.mock('../../components/MiniMap', () => () => <div />);

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useParams: () => ({ id: '123' }),
}));

jest.mock('react-router', () => ({
    ...jest.requireActual('react-router'),
    useHistory: () => ({ push: jest.fn() }),
}));

window.scrollTo = jest.fn();

afterEach(() => {
    cleanup();
});

describe('Render Submit', () => {
    describe('with an authenticated user', () => {
        test('should render text', () => {
            render(
                <LoginContext.Provider value={loginValue}>
                    <Submit onNav={jest.fn()} />
                </LoginContext.Provider>,
            );
            const text1 = screen.getByText(strings.infoGeneral);
            const text2 = screen.getByText(strings.mandatory);
            expect(text1).toBeInTheDocument();
            expect(text2).toBeInTheDocument();
        });
    });
});
