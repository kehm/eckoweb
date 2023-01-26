import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';
import Filter from './Filter';
import strings from '../../strings';

afterEach(() => {
    cleanup();
});

describe('Render Filter', () => {
    test('should render text', () => {
        render(
            <Filter
                openDialog
                onClose={jest.fn()}
                onUpdate={jest.fn()}
            />,
        );
        const text1 = screen.getByText(strings.filterShow);
        const text2 = screen.getByText(strings.filterApply);
        expect(text1).toBeInTheDocument();
        expect(text2).toBeInTheDocument();
    });
});
