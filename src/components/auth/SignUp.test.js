import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';
import SignUp from './SignUp';
import strings from '../../strings';

afterEach(() => {
    cleanup();
});

describe('Render SignUp', () => {
    describe('with status signup', () => {
        test('should render text', () => {
            render(
                <SignUp status="signup" />,
            );
            const text1 = screen.getByText(strings.welcome);
            const text2 = screen.getByText(strings.orcidSuccess);
            const text3 = screen.getByText(strings.buttonRegister);
            expect(text1).toBeInTheDocument();
            expect(text2).toBeInTheDocument();
            expect(text3).toBeInTheDocument();
        });
    });
    describe('with status none', () => {
        test('should render text', () => {
            render(
                <SignUp status="none" />,
            );
            const text1 = screen.queryByText(strings.welcome);
            const text2 = screen.queryByText(strings.orcidSuccess);
            const text3 = screen.queryByText(strings.buttonRegister);
            expect(text1).not.toBeInTheDocument();
            expect(text2).not.toBeInTheDocument();
            expect(text3).not.toBeInTheDocument();
        });
    });
});
