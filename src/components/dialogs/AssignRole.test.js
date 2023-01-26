import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';
import AssignRole from './AssignRole';
import strings from '../../strings';

afterEach(() => {
    cleanup();
});

describe('Render AssignRole', () => {
    test('should render text', () => {
        const affiliation = {
            role: 'MEMBER',
        };
        const roles = [
            { name: 'MEMBER', description: 'Internal member' },
            { name: 'EXTERNAL', description: 'External member' },
        ];
        render(
            <AssignRole
                open
                affiliation={affiliation}
                roles={roles}
                onClose={jest.fn()}
                onSuccess={jest.fn()}
            />,
        );
        const text1 = screen.getByText('Member - Internal member');
        const text2 = screen.getByText(strings.buttonSave);
        expect(text1).toBeInTheDocument();
        expect(text2).toBeInTheDocument();
    });
});
