import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';
import SamplingForm from './SamplingForm';
import FormContext from '../../context/FormContext';
import strings from '../../strings';

const formValue = { form: {}, setForm: jest.fn() };

afterEach(() => {
    cleanup();
});

describe('Render SamplingForm', () => {
    test('should render text', () => {
        render(
            <FormContext.Provider value={formValue}>
                <SamplingForm onNext={jest.fn()} onPrev={jest.fn()} />
            </FormContext.Provider>,
        );
        const text = screen.getByText(strings.infoSampling);
        expect(text).toBeInTheDocument();
    });
});
