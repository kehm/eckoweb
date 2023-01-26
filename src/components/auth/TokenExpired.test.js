import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import TokenExpired from './TokenExpired';
import strings from '../../strings';

afterEach(() => {
    cleanup();
});

describe('Render TokenExpired', () => {
    test('should render text', () => {
        render(
            <BrowserRouter>
                <TokenExpired />
            </BrowserRouter>,
        );
        const text = screen.getByText(strings.linkExpired);
        expect(text).toBeInTheDocument();
    });
});
