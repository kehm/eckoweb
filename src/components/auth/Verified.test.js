import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import Verified from './Verified';
import strings from '../../strings';

afterEach(() => {
    cleanup();
});

describe('Render Verified', () => {
    test('should render text', () => {
        render(
            <BrowserRouter>
                <Verified />
            </BrowserRouter>,
        );
        const text1 = screen.getByText(strings.welcome);
        const text2 = screen.getByText(strings.emailVerified);
        const text3 = screen.getByText(strings.goSignIn);
        expect(text1).toBeInTheDocument();
        expect(text2).toBeInTheDocument();
        expect(text3).toBeInTheDocument();
    });
});
