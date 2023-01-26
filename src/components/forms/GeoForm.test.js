import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';
import GeoForm from './GeoForm';
import FormContext from '../../context/FormContext';
import strings from '../../strings';

const formValue = { form: {}, setForm: jest.fn() };

jest.mock('../components/MiniMap', () => () => <div />);

afterEach(() => {
    cleanup();
});

describe('Render GeoForm', () => {
    test('should render text', () => {
        render(
            <FormContext.Provider value={formValue}>
                <GeoForm onNext={jest.fn()} onPrev={jest.fn()} />
            </FormContext.Provider>,
        );
        const text1 = screen.getByText(strings.infoGeo);
        const text2 = screen.getByText('Sample year(s):');
        expect(text1).toBeInTheDocument();
        expect(text2).toBeInTheDocument();
    });
});
