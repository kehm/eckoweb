import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';
import NoMatch from './NoMatch';

afterEach(() => {
    cleanup();
});

describe('Render NoMatch', () => {
    test('should render text', () => {
        render(
            <NoMatch />,
        );
        const text = screen.getByText('An error occurred. Please try again later.');
        expect(text).toBeInTheDocument();
    });
});
