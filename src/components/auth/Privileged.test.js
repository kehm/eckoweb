import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import Privileged from './Privileged';
import strings from '../../strings';

afterEach(() => {
    cleanup();
});

describe('Render Privileged', () => {
    test('should render text', () => {
        render(
            <BrowserRouter>
                <Privileged />
            </BrowserRouter>,
        );
        const text1 = screen.getByText(strings.invalidRole);
        const text2 = screen.getByText(strings.roleRequired);
        const text3 = screen.getByText(strings.buttonHome);
        expect(text1).toBeInTheDocument();
        expect(text2).toBeInTheDocument();
        expect(text3).toBeInTheDocument();
    });
});
