import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';
import Admin from './Admin';
import strings from '../../strings';

afterEach(() => {
    cleanup();
});

describe('Render Admin', () => {
    test('should render text', () => {
        render(
            <Admin
                open
                onClose={jest.fn()}
            />,
        );
        const text1 = screen.getByText(strings.headerUsers);
        const text2 = screen.getByText(strings.noAffiliations);
        expect(text1).toBeInTheDocument();
        expect(text2).toBeInTheDocument();
    });
});
