import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';
import BackButton from './BackButton';
import strings from '../../../strings';

afterEach(() => {
    cleanup();
});

describe('Render BackButton', () => {
    test('should render text', () => {
        render(
            <BackButton onClick={jest.fn()} />,
        );
        const text = screen.getByText(strings.goBack);
        expect(text).toBeInTheDocument();
    });
});
