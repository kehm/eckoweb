import React from 'react';
import { Link } from 'react-router-dom';
import strings from '../../strings';
import logo from '../../images/logo-white.png';

/**
 * Render footer
 */
const Footer = ({ onNavSelect }) => (
    <footer className="absolute bg-mainDark w-full h-36 es:h-44 bottom-32 es:bottom-24">
        <div className="hidden lg:inline absolute left-0 xl:left-10 mt-12">
            <Link
                className="flex w-72 lg:w-80 md:mr-28 pl-2 md:pl-5 text-white text-left break-words mt-3"
                to="/"
                onClick={() => onNavSelect()}
            >
                <img src={logo} alt="ECKO logo" height={46} width={118} />
                <h2 className="inline w-40 lg:w-44 font-medium text-sm lg:text-base pt-1 lg:pt-0 pl-2 md:pl-4">{strings.siteSubTitle}</h2>
            </Link>
        </div>
        <div className="absolute right-0 xl:right-10 max-w-4xl mt-12 sm:mt-16 pt-2">
            <ul className="list-none text-sm sm:text-base leading-loose">
                <li className="inline mr-5">
                    <Link
                        to="/"
                        onClick={() => onNavSelect()}
                        className="text-white hover:text-yellow-500"
                    >
                        {strings.navHome}
                    </Link>
                </li>
                <li className="inline mr-5">
                    <Link
                        to="/about/about"
                        onClick={() => onNavSelect()}
                        className="text-white hover:text-yellow-500"
                    >
                        {strings.navWhatIs}
                    </Link>
                </li>
                <li className="inline mr-5">
                    <Link
                        to="/about/privacy"
                        onClick={() => onNavSelect()}
                        className="text-white hover:text-yellow-500"
                    >
                        {strings.navPrivacy}
                    </Link>
                </li>
                <li className="inline mr-5">
                    <Link
                        to="/about/about"
                        onClick={() => onNavSelect()}
                        className="text-white hover:text-yellow-500"
                    >
                        {strings.navContact}
                    </Link>
                </li>
            </ul>
        </div>
    </footer>
);

export default Footer;
