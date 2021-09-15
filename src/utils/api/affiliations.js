import axios from 'axios';

/**
 * Create new user affiliation
 *
 * @param {int} organizationId Organization ID
 */
export const createUserAffiliation = async (organizationId) => {
    await axios.post(
        `${process.env.REACT_APP_API_URL}/affiliations`,
        {
            organizationId,
        },
        { timeout: process.env.REACT_APP_HTTP_TIMEOUT },
    );
};

/**
 * Remove user affiliation (for the user in session)
 *
 * @param {int} organizationId Organization ID
 */
export const removeUserAffiliation = async (organizationId) => {
    await axios.delete(
        `${process.env.REACT_APP_API_URL}/affiliations/organization/${organizationId}`,
    );
};

/**
 * Remove user affiliation (invoked by admin)
 *
 * @param {int} organizationId Organization ID
 */
export const removeAffiliation = async (organizationId) => {
    await axios.delete(
        `${process.env.REACT_APP_API_URL}/affiliations/${organizationId}`,
    );
};

/**
 * Change the user's role in the organization
 *
 * @param {int} organizationId Organization ID
 * @param {string} role Role name
 */
export const changeUserRole = async (organizationId, role) => {
    await axios.put(
        `${process.env.REACT_APP_API_URL}/affiliations/role/${organizationId}`,
        { role },
        { timeout: process.env.REACT_APP_HTTP_TIMEOUT },
    );
};
