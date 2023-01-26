import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';
import NextButton from './NextButton';
import strings from '../../../strings';

afterEach(() => {
    cleanup();
});

describe('Render NextButton', () => {
    test('should render text', () => {
        render(
            <NextButton onClick={jest.fn()} />,
        );
        const text = screen.getByText(strings.next);
        expect(text).toBeInTheDocument();
    });
});
