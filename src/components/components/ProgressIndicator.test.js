import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';
import ProgressIndicator from './ProgressIndicator';
import strings from '../../strings';

afterEach(() => {
    cleanup();
});

describe('Render ProgressIndicator', () => {
    test('should render text', () => {
        render(
            <ProgressIndicator open />,
        );
        const text = screen.getByText(strings.connectBlockchain);
        expect(text).toBeInTheDocument();
    });
});
