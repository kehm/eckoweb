import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';
import LicenseLink from './LicenseLink';

afterEach(() => {
    cleanup();
});

describe('Render LicenseLink', () => {
    test('should render text', () => {
        const license = {
            name: '',
            description: '',
            url: '',
        };
        render(
            <LicenseLink license={license} />,
        );
        const text = screen.getByText('License:');
        expect(text).toBeInTheDocument();
    });
});
