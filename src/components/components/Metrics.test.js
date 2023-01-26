import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';
import Metrics from './Metrics';
import strings from '../../strings';

afterEach(() => {
    cleanup();
});

describe('Render Metrics', () => {
    test('should render text', () => {
        render(
            <Metrics />,
        );
        const text1 = screen.queryByText(strings.headerNoDatasets);
        const text2 = screen.queryByText(strings.headerDownloads);
        const text3 = screen.queryByText(strings.headerMembers);
        const text4 = screen.queryByText(strings.headerBlocks);
        // Metrics are currently disabled
        expect(text1).not.toBeInTheDocument();
        expect(text2).not.toBeInTheDocument();
        expect(text3).not.toBeInTheDocument();
        expect(text4).not.toBeInTheDocument();
    });
});
