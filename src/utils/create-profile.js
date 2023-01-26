import Cookies from 'universal-cookie';

/**
 * Set profile variables
 *
 * @param {Object} profile User profile
 */
const setProfile = (profile) => {
    let authenticated = false;
    if (profile && profile.email) {
        authenticated = true;
    }
    const login = {
        authenticated,
        orcid: profile && profile.orcid,
        name: profile && profile.name,
        email: profile && profile.email,
        organization: profile && profile.organization,
        role: profile && profile.role,
        status: profile && profile.status,
    };
    return login;
};

/**
 * Create user profile
 *
 * @param {boolean} authenticated True if authenticated with API
 */
const createProfile = (authenticated) => {
    const cookies = new Cookies();
    if (authenticated && cookies.get(process.env.REACT_APP_AUTH_COOKIE)) {
        return setProfile(cookies.get(process.env.REACT_APP_AUTH_COOKIE));
    }
    return setProfile(undefined);
};

export default createProfile;
