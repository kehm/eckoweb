import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';
import Register from './Register';
import strings from '../../strings';

afterEach(() => {
    cleanup();
});

describe('Render Register', () => {
    test('should render text', () => {
        render(
            <Register />,
        );
        const text1 = screen.getByText(strings.registerAffiliation);
        const text2 = screen.getByText(strings.buttonRegister);
        const text3 = screen.queryByText(strings.affiliationSuccess);
        expect(text1).toBeInTheDocument();
        expect(text2).toBeInTheDocument();
        expect(text3).not.toBeInTheDocument();
    });
});
