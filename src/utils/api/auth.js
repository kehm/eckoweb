import axios from 'axios';

/**
 * Check if user is authenticated
 */
export const validateSession = async () => {
    await axios.post(
        `${process.env.REACT_APP_API_URL}/auth`,
        {},
        { timeout: process.env.REACT_APP_HTTP_TIMEOUT },
    );
};

/**
 * Invalidate user session
 */
export const invalidateSession = async () => {
    await axios.post(
        `${process.env.REACT_APP_API_URL}/auth/invalidate`,
        {},
        { timeout: process.env.REACT_APP_HTTP_TIMEOUT },
    );
};

/**
 * Add email address to user profile
 *
 * @param {string} email Email address
 */
export const addEmailToProfile = async (email) => {
    await axios.post(
        `${process.env.REACT_APP_API_URL}/auth/profile`,
        email,
        { timeout: process.env.REACT_APP_HTTP_TIMEOUT },
    );
};

/**
 * Reset user's email
 */
export const resetEmail = async () => {
    await axios.post(
        `${process.env.REACT_APP_API_URL}/auth/profile/reset`,
        {},
        { timeout: process.env.REACT_APP_HTTP_TIMEOUT },
    );
};

/**
 * Request a new token to be sent by email
 */
export const requestToken = async () => {
    await axios.post(
        `${process.env.REACT_APP_API_URL}/auth/token/email`,
        {},
        { timeout: process.env.REACT_APP_HTTP_TIMEOUT },
    );
};
