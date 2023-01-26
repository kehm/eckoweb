import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';
import InfoPopover from './InfoPopover';

afterEach(() => {
    cleanup();
});

describe('Render InfoPopover', () => {
    describe('with content', () => {
        test('should render title', () => {
            render(
                <InfoPopover content="test" />,
            );
            const title = screen.getByTitle('Click for more info');
            expect(title).toBeInTheDocument();
        });
    });
    describe('without content', () => {
        test('should render title', () => {
            render(
                <InfoPopover />,
            );
            const title = screen.getByTitle('Click for more info');
            expect(title).toBeInTheDocument();
        });
    });
});
