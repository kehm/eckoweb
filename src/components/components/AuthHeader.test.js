import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import AuthHeader from './AuthHeader';

afterEach(() => {
    cleanup();
});

describe('Render AuthHeader', () => {
    test('should render text', () => {
        const login = {
            email: 'test@test.com',
        };
        render(
            <BrowserRouter>
                <AuthHeader login={login} onSignOut={jest.fn()} />
            </BrowserRouter>,
        );
        const text1 = screen.getByText('test@test.com');
        const text2 = screen.getByText('(sign out)');
        expect(text1).toBeInTheDocument();
        expect(text2).toBeInTheDocument();
    });
});
