import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import CookieNotice from './CookieNotice';
import strings from '../../strings';

afterEach(() => {
    cleanup();
});

describe('Render CookieNotice', () => {
    test('should render text', () => {
        render(
            <BrowserRouter>
                <CookieNotice onConsent={jest.fn()} />
            </BrowserRouter>,
        );
        const text1 = screen.getByText(strings.buttonCookieAccept);
        const text2 = screen.getByText(strings.buttonCookieReject);
        expect(text1).toBeInTheDocument();
        expect(text2).toBeInTheDocument();
    });
});
