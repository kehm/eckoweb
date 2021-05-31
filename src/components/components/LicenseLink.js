import React from 'react';
import strings from '../../strings';

/**
 * Show license link
 */
const LicenseLink = ({ license }) => {
    let licenseShort;
    let licenseName;
    let licenseUrl;
    if (license) {
        licenseShort = license.name;
        licenseName = license.description;
        licenseUrl = license.url;
    } else return null;
    return (
        <>
            <span className="font-light">
                {strings.labelLicense}
                :
            </span>
            <p className="break-words">{licenseShort}</p>
            <p className="break-words">{licenseName}</p>
            <a
                className="text-blue-400 block overflow-hidden overflow-ellipsis"
                target="_blank"
                rel="noopener noreferrer"
                href={licenseUrl}
                title={licenseUrl}
            >
                {licenseUrl}
            </a>
        </>
    );
};

export default LicenseLink;
