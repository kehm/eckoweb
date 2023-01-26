import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import PolicyForm from './PolicyForm';
import FormContext from '../../context/FormContext';
import strings from '../../strings';

const formValue = { form: {}, setForm: jest.fn() };

afterEach(() => {
    cleanup();
});

describe('Render PolicyForm', () => {
    test('should render text', () => {
        render(
            <BrowserRouter>
                <FormContext.Provider value={formValue}>
                    <PolicyForm onNext={jest.fn()} onPrev={jest.fn()} />
                </FormContext.Provider>
            </BrowserRouter>,
        );
        const text1 = screen.getByText(strings.infoPolicy);
        const text2 = screen.getByText(strings.submit);
        expect(text1).toBeInTheDocument();
        expect(text2).toBeInTheDocument();
    });
});
