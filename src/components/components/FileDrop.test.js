import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';
import FileDrop from './FileDrop';
import strings from '../../strings';

afterEach(() => {
    cleanup();
});

describe('Render FileDrop', () => {
    describe('with required true', () => {
        test('should render text', () => {
            const fileTypes = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel, application/vnd.oasis.opendocument.spreadsheet, text/csv';
            render(
                <FileDrop
                    required
                    accept={fileTypes}
                    maxFiles={1}
                    label={strings.labelDataset}
                    acceptLabel={strings.acceptedFileTypes}
                    info={strings.infoDataset}
                    files={[]}
                    onUpdate={jest.fn()}
                />,
            );
            const text1 = screen.getByText(strings.dragAndDrop);
            const text2 = screen.getByText('Selected files:');
            const text3 = screen.getByText(`(${strings.acceptedFileTypes})`);
            expect(text1).toBeInTheDocument();
            expect(text2).toBeInTheDocument();
            expect(text3).toBeInTheDocument();
        });
    });
    describe('with required false', () => {
        test('should render text', () => {
            const fileTypes = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel, application/vnd.oasis.opendocument.spreadsheet, text/csv';
            render(
                <FileDrop
                    accept={fileTypes}
                    maxFiles={1}
                    label={strings.labelDataset}
                    acceptLabel={strings.acceptedFileTypes}
                    info={strings.infoDataset}
                    files={[]}
                    onUpdate={jest.fn()}
                />,
            );
            const text1 = screen.getByText(strings.dragAndDrop);
            const text2 = screen.getByText('Selected files:');
            const text3 = screen.getByText(`(${strings.acceptedFileTypes})`);
            expect(text1).toBeInTheDocument();
            expect(text2).toBeInTheDocument();
            expect(text3).toBeInTheDocument();
        });
    });
});
