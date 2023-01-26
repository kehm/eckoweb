import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';
import Expired from './Expired';

afterEach(() => {
    cleanup();
});

describe('Render Expired', () => {
    test('should render text', () => {
        render(
            <Expired />,
        );
        const text = screen.getByText('Your session has expired. Please sign in again.');
        expect(text).toBeInTheDocument();
    });
});
