import axios from 'axios';
import {
    createDataset,
    getDatasetFile,
    removeDatasetFile,
    updateDataset,
} from './datasets';

const getMock = jest.spyOn(axios, 'get');
const postMock = jest.spyOn(axios, 'post');
const putMock = jest.spyOn(axios, 'put');
const deleteMock = jest.spyOn(axios, 'delete');

afterEach(() => {
    jest.clearAllMocks();
});

describe('Call function getDatasetFile', () => {
    test('should return dataset', async () => {
        getMock.mockResolvedValue({ data: 'test' });
        await expect(getDatasetFile(
            'OS-2020-2021-NO-940881',
        )).resolves.not.toThrowError();
    });
});

describe('Call function removeDatasetFile', () => {
    test('should not throw error', async () => {
        deleteMock.mockResolvedValue();
        await expect(removeDatasetFile(
            'OS-2020-2021-NO-940881',
        )).resolves.not.toThrowError();
    });
});

describe('Call function createDataset', () => {
    test('should not throw error', async () => {
        postMock.mockResolvedValue();
        const body = {
            description: 'test',
        };
        await expect(createDataset(
            body,
        )).resolves.not.toThrowError();
    });
});

describe('Call function updateDataset', () => {
    test('should not throw error', async () => {
        putMock.mockResolvedValue();
        const body = {
            description: 'test',
        };
        await expect(updateDataset(
            'OS-2020-2021-NO-940881',
            body,
        )).resolves.not.toThrowError();
    });
});
