import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';
import ContactForm from './ContactForm';
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

describe('Render ContactForm', () => {
    test('should render text', () => {
        render(
            <LoginContext.Provider value={loginValue}>
                <ContactForm onNext={jest.fn()} onPrev={jest.fn()} />
            </LoginContext.Provider>,
        );
        const text = screen.getAllByText('Full name');
        expect(text).toHaveLength(3);
    });
});
