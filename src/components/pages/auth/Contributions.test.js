import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import Contributions from './Contributions';
import strings from '../../../strings';

jest.mock('../Dataset', () => () => <div />);

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useParams: () => ({ id: '123' }),
}));

window.scrollTo = jest.fn();

afterEach(() => {
    cleanup();
});

describe('Render Contributions', () => {
    describe('with no contributions', () => {
        test('should render text', () => {
            render(
                <BrowserRouter>
                    <Contributions onNav={jest.fn()} />
                </BrowserRouter>,
            );
            const text = screen.getByText(strings.noContributions);
            expect(text).toBeInTheDocument();
        });
    });
});
