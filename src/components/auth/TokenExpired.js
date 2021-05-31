import React from 'react';
import { Link } from 'react-router-dom';
import strings from '../../strings';

/**
 * Render token expired page
 */
const TokenExpired = () => (
    <div className="py-12 m-auto max-w-lg relative">
        <h1 className="pb-2">{strings.linkExpired}</h1>
        <p>
            <Link
                to="/submit"
                className="text-blue-400"
            >
                {strings.linkSignIn}
                &nbsp;
            </Link>
            {strings.infoLinkExpired}
        </p>
    </div>
);

export default TokenExpired;
