import axios from 'axios';
import {
    changeUserRole,
    createUserAffiliation,
    removeAffiliation,
    removeUserAffiliation,
} from './affiliations';

const postMock = jest.spyOn(axios, 'post');
const putMock = jest.spyOn(axios, 'put');
const deleteMock = jest.spyOn(axios, 'delete');

afterEach(() => {
    jest.clearAllMocks();
});

describe('Call function createUserAffiliation', () => {
    test('should not throw error', async () => {
        postMock.mockResolvedValue();
        await expect(createUserAffiliation(
            'org1',
        )).resolves.not.toThrowError();
    });
});

describe('Call function removeUserAffiliation', () => {
    test('should not throw error', async () => {
        deleteMock.mockResolvedValue();
        await expect(removeUserAffiliation(
            'org1',
        )).resolves.not.toThrowError();
    });
});

describe('Call function removeAffiliation', () => {
    test('should not throw error', async () => {
        deleteMock.mockResolvedValue();
        await expect(removeAffiliation(
            'org1',
        )).resolves.not.toThrowError();
    });
});

describe('Call function changeUserRole', () => {
    test('should not throw error', async () => {
        putMock.mockResolvedValue();
        await expect(changeUserRole(
            'org1',
            'MEMBER',
        )).resolves.not.toThrowError();
    });
});
