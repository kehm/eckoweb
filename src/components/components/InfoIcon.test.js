import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';
import InfoIcon from './InfoIcon';

afterEach(() => {
    cleanup();
});

describe('Render InfoIcon', () => {
    test('should render title', () => {
        render(
            <InfoIcon info="test" />,
        );
        const title = screen.getByTitle('Click for more info');
        expect(title).toBeInTheDocument();
    });
});
