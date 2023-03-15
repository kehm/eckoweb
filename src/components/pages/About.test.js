import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';
import About from './About';

window.scrollTo = jest.fn();

afterEach(() => {
    cleanup();
    jest.clearAllMocks();
});

describe('Render About', () => {
    describe('with page about', () => {
        test('should render text', () => {
            const props = {
                match: {
                    params: {
                        page: 'about',
                    },
                },
            };
            const content = {
                about: {
                    Title: 'About',
                    Content: 'About block',
                },
                privacyPolicy: {
                    Title: 'Privacy Policy',
                    Content: 'Privacy policy block',
                },
            };
            render(
                <About
                    props={props}
                    content={content}
                    onPageView={jest.fn()}
                />,
            );
            const text = screen.getByText('About block');
            expect(text).toBeInTheDocument();
        });
    });
    describe('with page privacy', () => {
        test('should render text', () => {
            const props = {
                match: {
                    params: {
                        page: 'privacy',
                    },
                },
            };
            const content = {
                about: {
                    Title: 'About',
                    Content: 'About block',
                },
                privacyPolicy: {
                    Title: 'Privacy Policy',
                    Content: 'Privacy policy block',
                },
            };
            render(
                <About
                    props={props}
                    content={content}
                    onPageView={jest.fn()}
                />,
            );
            const text = screen.getByText('Privacy policy block');
            expect(text).toBeInTheDocument();
        });
    });
    describe('with no page', () => {
        test('should render text', () => {
            const props = {
                match: {
                    params: {
                        page: 'test',
                    },
                },
            };
            const content = {
                about: {
                    Title: 'About',
                    Content: 'About block',
                },
                privacyPolicy: {
                    Title: 'Privacy Policy',
                    Content: 'Privacy policy block',
                },
            };
            render(
                <About
                    props={props}
                    content={content}
                    onPageView={jest.fn()}
                />,
            );
            const text = screen.getByText('About block');
            expect(text).toBeInTheDocument();
        });
    });
});
