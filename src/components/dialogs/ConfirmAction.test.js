import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';
import ConfirmAction from './ConfirmAction';
import strings from '../../strings';

afterEach(() => {
    cleanup();
});

describe('Render ConfirmAction', () => {
    test('should render text', () => {
        render(
            <ConfirmAction
                openContent
                onClose={jest.fn()}
                onConfirm={jest.fn()}
            />,
        );
        const text1 = screen.getByText(strings.buttonConfirm);
        const text2 = screen.getByText(strings.buttonCancel);
        expect(text1).toBeInTheDocument();
        expect(text2).toBeInTheDocument();
    });
});
