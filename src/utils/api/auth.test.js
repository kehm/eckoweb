import axios from 'axios';
import {
    addEmailToProfile,
    invalidateSession,
    requestToken,
    resetEmail,
    validateSession,
} from './auth';

jest.spyOn(axios, 'post').mockResolvedValue();

afterEach(() => {
    jest.clearAllMocks();
});

describe('Call function validateSession', () => {
    test('should not throw error', async () => {
        await expect(validateSession()).resolves.not.toThrowError();
    });
});

describe('Call function invalidateSession', () => {
    test('should not throw error', async () => {
        await expect(invalidateSession()).resolves.not.toThrowError();
    });
});

describe('Call function addEmailToProfile', () => {
    test('should not throw error', async () => {
        await expect(addEmailToProfile(
            'test@test.com',
        )).resolves.not.toThrowError();
    });
});

describe('Call function resetEmail', () => {
    test('should not throw error', async () => {
        await expect(resetEmail()).resolves.not.toThrowError();
    });
});

describe('Call function requestToken', () => {
    test('should not throw error', async () => {
        await expect(requestToken()).resolves.not.toThrowError();
    });
});
