import React from 'react';
import { Link } from 'react-router-dom';
import CookieConsent from 'react-cookie-consent';
import strings from '../../strings';

/**
 * Render cookie notice
 */
const CookieNotice = ({ onConsent }) => (
    <CookieConsent
        contentClasses="p-5"
        containerClasses="font-sans pb-6"
        buttonClasses="h-10 w-24"
        declineButtonClasses="h-10 w-24"
        buttonText={strings.buttonCookieAccept}
        declineButtonText={strings.buttonCookieReject}
        enableDeclineButton
        flipButtons
        overlay
        buttonStyle={{ borderRadius: '4px' }}
        declineButtonStyle={{ borderRadius: '4px' }}
        onAccept={() => onConsent()}
        onDecline={() => onConsent()}
    >
        <h1 className="text-white">{strings.cookieHeader}</h1>
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
