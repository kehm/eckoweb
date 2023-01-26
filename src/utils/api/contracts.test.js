import axios from 'axios';
import {
    getContract,
    resolveContract,
    submitProposal,
    withdrawProposal,
} from './contracts';

const getMock = jest.spyOn(axios, 'get');
const postMock = jest.spyOn(axios, 'post');

afterEach(() => {
    jest.clearAllMocks();
});

describe('Call function submitProposal', () => {
    test('should not throw error', async () => {
        postMock.mockResolvedValue();
        const body = {
            proposal: 'test',
        };
        await expect(submitProposal(
            'OS-2020-2021-NO-940881',
            body,
        )).resolves.not.toThrowError();
    });
});

describe('Call function resolveContract', () => {
    test('should not throw error', async () => {
        postMock.mockResolvedValue();
        await expect(resolveContract(
            '1dc11c86-3aef-4877-84ce-fe19e4687024',
            true,
            'test',
        )).resolves.not.toThrowError();
    });
});

describe('Call function withdrawProposal', () => {
    test('should not throw error', async () => {
        postMock.mockResolvedValue();
        await expect(withdrawProposal(
            '1dc11c86-3aef-4877-84ce-fe19e4687024',
        )).resolves.not.toThrowError();
    });
});

describe('Call function getDatasetFile', () => {
    test('should return dataset', async () => {
        getMock.mockResolvedValue({ data: { datasetId: 'OS-2020-2021-NO-940881' } });
        const contract = await getContract('OS-2020-2021-NO-940881');
        expect(contract.datasetId).toEqual('OS-2020-2021-NO-940881');
    });
});
