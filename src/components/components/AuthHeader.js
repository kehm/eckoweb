import React from 'react';
import { Link } from 'react-router-dom';
import strings from '../../strings';
import logo from '../../images/ORCIDiD_iconvector.svg';

/**
 * Render authentication info header
 */
const AuthHeader = ({ login, onSignOut }) => (
    <span className="hidden sm:inline absolute mt-2 right-2 text-xs z-10">
        <img src={logo} alt="ORCID iD logo" height={24} className="hidden lg:inline align-middle" />
        <a
            className="hidden lg:inline text-blue-400"
            target="_blank"
            rel="noopener noreferrer"
            href={`${strings.orcidUrl}${login.orcid}`}
        >
            {` ${strings.orcidUrl}${login.orcid}`}
        </a>
        <Link
            className="text-darkGrey"
            to="/"
            onClick={() => onSignOut()}
            title={strings.signOut}
        >
            {strings.signOutsmall}
        </Link>
    </span>
);

export default AuthHeader;
