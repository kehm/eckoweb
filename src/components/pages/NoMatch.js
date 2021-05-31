import React from 'react';
import strings from '../../strings';

/**
 * Render error page
 */
const NoMatch = () => (
    <div className="pt-8 pb-14 text-center leading-normal">
        <p>{strings.errorTryAgain}</p>
    </div>
);

export default NoMatch;
