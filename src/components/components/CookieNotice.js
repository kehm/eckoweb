import React from 'react';
import CookieConsent from 'react-cookie-consent';
import { Link } from 'react-router-dom';
import strings from '../../strings';

/**
 * Render cookie notice
 */
const CookieNotice = () => (
    <CookieConsent
        contentClasses="p-5"
        containerClasses="sm:h-60 font-sans"
        buttonClasses="h-10 w-24"
        declineButtonClasses="h-10 w-24"
        buttonText={strings.buttonCookieAccept}
        declineButtonText={strings.buttonCookieReject}
        enableDeclineButton
        flipButtons
        overlay
    >
        <h1>{strings.cookieHeader}</h1>
        <h3 className="my-2">
            {strings.cookieNotice}
            {strings.readOur}
            <Link className="text-blue-400" to="/about/privacy">{strings.privacyPolicy}</Link>
            .
        </h3>
        <p>{strings.cookieInfo}</p>
        <p>{strings.cookieInfo2}</p>
    </CookieConsent>
);

export default CookieNotice;
