import axios from 'axios';

/**
 * Submit contract proposal
 *
 * @param {string} datasetId Dataset ID
 * @param {string} proposal Contract proposal
 */
export const submitProposal = async (datasetId, proposal) => {
    await axios.post(`${process.env.REACT_APP_API_URL}/contracts`, {
        datasetId,
        proposal,
    }, {
        headers: {
            'Content-Type': 'application/json',
        },
        timeout: process.env.REACT_APP_HTTP_TIMEOUT,
    });
};

/**
 * Resolve contract
 *
 * @param {string} contractId Contract ID
 * @param {boolean} accept True if accept, false if reject
 * @param {string} response Proposal response (required if rejected)
 */
export const resolveContract = async (contractId, accept, response) => {
    await axios.post(`${process.env.REACT_APP_API_URL}/contracts/resolve`, {
        contractId,
        accept,
        response,
    }, {
        headers: {
            'Content-Type': 'application/json',
        },
        timeout: process.env.REACT_APP_HTTP_TIMEOUT,
    });
};

/**
 * Withdraw contract proposal
 *
 * @param {string} contractId Contract ID
 */
export const withdrawProposal = async (contractId) => {
    await axios.post(`${process.env.REACT_APP_API_URL}/contracts/withdraw`, {
        contractId,
    }, {
        headers: {
            'Content-Type': 'application/json',
        },
        timeout: process.env.REACT_APP_HTTP_TIMEOUT,
    });
};

/**
 * Get contract for dataset
 *
 * @param {string} datasetId Dataset ID
 */
export const getContract = async (datasetId) => {
    const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/contracts/dataset/${datasetId}`,
        { timeout: process.env.REACT_APP_HTTP_TIMEOUT },
    );
    return response.data;
};
