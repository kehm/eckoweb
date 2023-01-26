import axios from 'axios';
import submitFeedback from './feedback';

const postMock = jest.spyOn(axios, 'post');

afterEach(() => {
    jest.clearAllMocks();
});

describe('Call function submitFeedback', () => {
    test('should not throw error', async () => {
        postMock.mockResolvedValue();
        const body = {
            type: 'feedback',
            email: 'test@test.com',
            message: 'test',
        };
        await expect(submitFeedback(
            body,
        )).resolves.not.toThrowError();
    });
});
