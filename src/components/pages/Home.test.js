import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import Home from './Home';

window.scrollTo = jest.fn();

afterEach(() => {
    cleanup();
    jest.clearAllMocks();
});

describe('Render Home', () => {
    test('should render text', () => {
        const content = {
            homeBlock1: {
                Title: 'Home 1',
                Content: 'Home block 1',
            },
            homeBlock2: {
                Title: 'Home 2',
                Content: 'Home block 2',
            },
            homeBlock3: {
                Title: 'Home 3',
                Content: 'Home block 3',
            },
            homeBlock4: {
                Title: 'Home 4',
                Content: 'Home block 4',
            },
        };
        render(
            <BrowserRouter>
                <Home
                    content={content}
                    onNavSelect={jest.fn()}
                />
            </BrowserRouter>,
        );
        const text1 = screen.getByAltText('Home background');
        const text2 = screen.getByText('Home block 1');
        const text3 = screen.getByText('Home block 2');
        const text4 = screen.getByText('Home block 3');
        const text5 = screen.getByText('Home block 4');
        expect(text1).toBeInTheDocument();
        expect(text2).toBeInTheDocument();
        expect(text3).toBeInTheDocument();
        expect(text4).toBeInTheDocument();
        expect(text5).toBeInTheDocument();
    });
});
