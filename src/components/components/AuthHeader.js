import React from 'react';
import { Link } from 'react-router-dom';
import strings from '../../strings';

/**
 * Render authentication info header
 */
const AuthHeader = ({ login, onSignOut }) => (
    <span className="hidden sm:inline absolute mt-2 right-1 text-xs z-10 -top-1 font-light">
        {login.email}
        <Link
            className="text-darkGrey font-bold"
            to="/"
            onClick={() => onSignOut()}
            title={strings.signOut}
        >
            {strings.signOutsmall}
        </Link>
    </span>
);

export default AuthHeader;
