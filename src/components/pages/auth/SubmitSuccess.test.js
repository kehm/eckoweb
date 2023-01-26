import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import SubmitSuccess from './SubmitSuccess';
import strings from '../../../strings';

afterEach(() => {
    cleanup();
});

describe('Render SubmitSuccess', () => {
    describe('with edit false', () => {
        test('should render text', () => {
            render(
                <BrowserRouter>
                    <SubmitSuccess onNav={jest.fn()} />
                </BrowserRouter>,
            );
            const text1 = screen.getByText(strings.submitSuccess);
            const text2 = screen.getByText(strings.buttonHome);
            expect(text1).toBeInTheDocument();
            expect(text2).toBeInTheDocument();
        });
    });
    describe('with edit true', () => {
        test('should render text', () => {
            render(
                <BrowserRouter>
                    <SubmitSuccess onNav={jest.fn()} edit />
                </BrowserRouter>,
            );
            const text1 = screen.getByText(strings.editSuccess);
            const text2 = screen.getByText(strings.buttonHome);
            expect(text1).toBeInTheDocument();
            expect(text2).toBeInTheDocument();
        });
    });
});
