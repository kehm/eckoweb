import axios from 'axios';

/**
 * Get dataset file
 *
 * @param {string} datasetId Dataset ID
 * @returns {Object} Blob
 */
export const getDatasetFile = async (datasetId) => {
    const response = await axios.get(`${process.env.REACT_APP_API_URL}/datasets/${datasetId}`, {
        headers: {
            'Accept': 'application/octect-stream',
        },
        timeout: process.env.REACT_APP_HTTP_TIMEOUT,
        responseType: 'blob',
    });
    return response.data;
};

/**
 * Remove dataset file
 *
 * @param {string} datasetId Dataset ID
 */
export const removeDatasetFile = async (datasetId) => {
    await axios.delete(
        `${process.env.REACT_APP_API_URL}/datasets/${datasetId}`,
        {},
        { timeout: process.env.REACT_APP_HTTP_TIMEOUT },
    );
};

/**
 * Create new dataset
 *
 * @param {Object} data Form data
 */
export const createDataset = async (data) => {
    await axios.post(
        `${process.env.REACT_APP_API_URL}/datasets`,
        data,
        {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            timeout: process.env.REACT_APP_HTTP_TIMEOUT,
        },
    );
};

/**
 * Update existing dataset
 *
 * @param {string} datasetId Dataset ID
 * @param {Object} data Form data
 */
export const updateDataset = async (datasetId, data) => {
    await axios.put(
        `${process.env.REACT_APP_API_URL}/datasets/${datasetId}`,
        data,
        {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            timeout: process.env.REACT_APP_HTTP_TIMEOUT,
        },
    );
};
