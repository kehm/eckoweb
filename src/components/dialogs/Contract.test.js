import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';
import Contract from './Contract';
import strings from '../../strings';

afterEach(() => {
    cleanup();
});

describe('Render Contract', () => {
    test('should render text', () => {
        const contract = {
            ecko_user: {
                user_email: {
                    email: 'test@test.com',
                },
            },
            status: 'PENDING',
            policy: {
                license: {
                    name: 'CC',
                    description: 'CC',
                    url: 'https://test.com',
                },
            },
        };
        render(
            <Contract
                open
                contract={contract}
                type={undefined}
                onClose={jest.fn()}
                onSuccess={jest.fn()}
            />,
        );
        const text = screen.getByText(strings.connectBlockchain);
        expect(text).toBeInTheDocument();
    });
});
