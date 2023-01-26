import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';
import ChangeEmail from './ChangeEmail';
import strings from '../../strings';

afterEach(() => {
    cleanup();
});

describe('Render ChangeEmail', () => {
    test('should render text', () => {
        render(
            <ChangeEmail
                open
                onClose={jest.fn()}
            />,
        );
        const text1 = screen.getByText(strings.headerChangeEmail);
        const text2 = screen.getByText(strings.buttonSave);
        expect(text1).toBeInTheDocument();
        expect(text2).toBeInTheDocument();
    });
});
