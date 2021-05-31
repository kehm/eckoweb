import { createContext } from 'react';

/**
 * Logged in user context
 */
export default createContext({
    authenticated: false,
    orcid: undefined,
    name: undefined,
    email: undefined,
    organization: undefined,
    role: undefined,
    setLogin: () => { },
});
