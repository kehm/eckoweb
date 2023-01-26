import React, { useState } from 'react';
import { render, screen, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import Verify from './Verify';
import strings from '../../strings';

jest.mock('react', () => ({
    ...jest.requireActual('react'),
    useState: jest.fn(),
}));

afterEach(() => {
    cleanup();
});

beforeEach(() => {
    useState.mockImplementation(jest.requireActual('react').useState);
});

describe('Render Verify', () => {
    describe('with no sent token', () => {
        test('should render text', () => {
            render(
                <BrowserRouter>
                    <Verify />
                </BrowserRouter>,
            );
            const text1 = screen.getByText(strings.pleaseVerifyEmail);
            const text2 = screen.getByText(strings.mustVerify);
            const text3 = screen.getByText(strings.notReceive);
            const text4 = screen.getByText(strings.buttonHome);
            const text5 = screen.getByText(strings.sendLink);
            const text6 = screen.getByText(strings.buttonResetEmail);
            expect(text1).toBeInTheDocument();
            expect(text2).toBeInTheDocument();
            expect(text3).toBeInTheDocument();
            expect(text4).toBeInTheDocument();
            expect(text5).toBeInTheDocument();
            expect(text6).toBeInTheDocument();
        });
    });
    describe('with sent token and error', () => {
        test('should render text', () => {
            useState.mockImplementation(() => [true, jest.fn()]);
            render(
                <BrowserRouter>
                    <Verify />
                </BrowserRouter>,
            );
            const text1 = screen.getByText(strings.pleaseVerifyEmail);
            const text2 = screen.getByText(strings.mustVerify);
            const text3 = screen.getByText(strings.linkSent);
            const text4 = screen.getByText(strings.buttonHome);
            const text5 = screen.queryByText(strings.sendLink);
            const text6 = screen.getByText(strings.buttonResetEmail);
            const text7 = screen.getByText(strings.errorTryAgain);
            expect(text1).toBeInTheDocument();
            expect(text2).toBeInTheDocument();
            expect(text3).toBeInTheDocument();
            expect(text4).toBeInTheDocument();
            expect(text5).not.toBeInTheDocument();
            expect(text6).toBeInTheDocument();
            expect(text7).toBeInTheDocument();
        });
    });
});
