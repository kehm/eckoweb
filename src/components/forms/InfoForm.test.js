import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';
import InfoForm from './InfoForm';
import FormContext from '../../context/FormContext';
import strings from '../../strings';

const formValue = { form: {}, setForm: jest.fn() };

afterEach(() => {
    cleanup();
});

describe('Render InfoForm', () => {
    describe('with edit false', () => {
        test('should render text', () => {
            render(
                <FormContext.Provider value={formValue}>
                    <InfoForm onNext={jest.fn()} onPrev={jest.fn()} />
                </FormContext.Provider>,
            );
            const text1 = screen.getByText(strings.infoGeneral);
            const text2 = screen.getByText(strings.mandatory);
            expect(text1).toBeInTheDocument();
            expect(text2).toBeInTheDocument();
        });
    });
    describe('with edit true', () => {
        test('should render text', () => {
            render(
                <FormContext.Provider value={formValue}>
                    <InfoForm
                        onNext={jest.fn()}
                        onPrev={jest.fn()}
                        edit
                    />
                </FormContext.Provider>,
            );
            const text1 = screen.queryByText(strings.infoGeneral);
            const text2 = screen.getByText(strings.mandatory);
            const text3 = screen.getByText(strings.removeDataset);
            expect(text1).not.toBeInTheDocument();
            expect(text2).toBeInTheDocument();
            expect(text3).toBeInTheDocument();
        });
    });
});
