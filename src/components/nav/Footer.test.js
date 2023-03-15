import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import Footer from './Footer';
import strings from '../../strings';

afterEach(() => {
    cleanup();
});

describe('Render Footer', () => {
    test('should render text', () => {
        render(
            <BrowserRouter>
                <Footer onNavSelect={jest.fn()} />
            </BrowserRouter>,
        );
        const text1 = screen.getByText(strings.navHome);
        const text2 = screen.getByText(strings.navPrivacy);
        const text3 = screen.getByText(strings.navWhatIs);
        const text4 = screen.getByText(strings.navContact);
        expect(text1).toBeInTheDocument();
        expect(text2).toBeInTheDocument();
        expect(text3).toBeInTheDocument();
        expect(text4).toBeInTheDocument();
    });
});
