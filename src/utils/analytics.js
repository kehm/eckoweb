import { getCookieConsentValue } from 'react-cookie-consent';
import GA4React from 'ga-4-react';

const ga4react = new GA4React(process.env.REACT_APP_GOOGLE_ANALYTICS_ID);

/**
 * Track page view if consent is given
 *
 * @param {string} title Page title
 */
const trackPageView = async (title) => {
    if (getCookieConsentValue() === 'true' && process.env.REACT_APP_GOOGLE_ANALYTICS_ID) {
        ga4react.initialize().finally(() => {
            ga4react.pageview(
                window.location.origin,
                window.location.pathname + window.location.search,
                title || document.title,
            );
        }).catch(() => { });
    }
};

export default trackPageView;
