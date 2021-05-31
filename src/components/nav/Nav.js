import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import strings from '../../strings';
import LoginContext from '../../context/LoginContext';
import Feedback from '../dialogs/Feedback';
import logo from '../../images/logo-black.png';
import MobileDrawer from './MobileDrawer';

/**
 * Render navigation menu
 */
const Nav = ({ secondaryNav, onClickSignOut, feedbackTrigger }) => {
    const { login } = useContext(LoginContext);
    const [selected, setSelected] = useState(0);
    const [tab, setTab] = useState(0);
    /**
     * Check url and set correct nav element as selected
     */
    const setNavSelected = (page) => {
        let path = window.location.pathname;
        if (page) {
            path = `/${page}`;
        } else if (path.split('/').length > 1) {
            path = `/${path.split('/')[1]}`;
        }
        switch (path) {
            case '/about':
                setSelected(1);
                break;
            case '/datasets':
                setSelected(2);
                break;
            case '/submit':
                setSelected(3);
                setTab(0);
                break;
            case '/contributions':
            case '/edit':
                setSelected(3);
                setTab(1);
                break;
            case '/contracts':
                setSelected(3);
                setTab(2);
                break;
            case '/profile':
            case '/admin':
                setSelected(3);
                setTab(3);
                break;
            case '/auth':
            case '/auth/signin':
            case '/auth/signup':
                setSelected(3);
                break;
            default:
                setSelected(0);
                break;
        }
    };

    useEffect(() => {
        setNavSelected();
        window.onpopstate = () => { setNavSelected(); };
    }, []);

    /**
     * Update nav when footer nav is clicked
     */
    useEffect(() => {
        setNavSelected();
    }, [secondaryNav]);

    /**
     * Render main nav
     */
    const renderNav = () => (
        <ul className="flex list-none justify-around pl-0">
            <li className="py-6 pr-2 lg:px-3">
                <Link
                    className={`link-nav ${selected === 0 ? 'text-yellow-500' : 'text-darkGrey'}`}
                    to="/"
                    onClick={() => setSelected(0)}
                >
                    {strings.navHome}
                </Link>
            </li>
            <li className="py-6 px-2 lg:px-3">
                <Link
                    className={`link-nav ${selected === 1 ? 'text-yellow-500' : 'text-darkGrey'}`}
                    to="/about/about"
                    onClick={() => setSelected(1)}
                >
                    {strings.navAbout}
                </Link>
            </li>
            <li className="py-6 px-2 lg:px-3">
                <Link
                    className={`link-nav ${selected === 2 ? 'text-yellow-500' : 'text-darkGrey'}`}
                    to="/datasets"
                    onClick={() => { setTab(0); setSelected(2); }}
                >
                    {strings.navDatasets}
                </Link>
            </li>
            <li className="py-6 pl-2 lg:px-3">
                <Link
                    className={`link-nav ${selected === 3 ? 'text-yellow-500' : 'text-darkGrey'}`}
                    to={login.authenticated ? '/submit' : '/auth/signin'}
                    onClick={() => setSelected(3)}
                >
                    {strings.navContribute}
                </Link>
            </li>
        </ul>
    );

    /**
     * Render sub nav for contribute menu
     *
     * @returns AppBar navigation
     */
    const renderContributeNav = () => (
        <div className="hidden sm:inline absolute w-full top-20 md:top-16 pt-2">
            <AppBar position="relative" color="transparent">
                <Tabs
                    value={tab}
                    onChange={(e, val) => setTab(val)}
                    aria-label="contribute tabs"
                    className="absolute xl:right-1/2"
                    TabIndicatorProps={{ style: { opacity: 0 } }}
                >
                    <Tab label={strings.navSubmit} component={Link} to="/submit" />
                    <Tab label={strings.navContributions} component={Link} to="/contributions" />
                    <Tab label={strings.navContracts} component={Link} to="/contracts" />
                    <Tab label={strings.navProfile} component={Link} to="/profile" />
                </Tabs>
            </AppBar>
        </div>
    );

    return (
        <nav className="w-full bg-white flex justify-around items-center z-30 text-darkGrey py-2 md:py-0">
            {login.authenticated && login.status === 'VERIFIED' && selected === 3 && renderContributeNav()}
            <MobileDrawer
                selected={selected}
                onSelect={(val) => setSelected(val)}
                onClickSignOut={() => onClickSignOut()}
            />
            <Link
                className="flex w-72 lg:w-80 md:mr-28 pl-2 md:pl-5 text-lg text-darkGrey text-left break-words"
                to="/"
                onClick={() => setNavSelected('home')}
            >
                <img src={logo} alt="ECKO logo" height={46} width={118} />
                <h2 className="inline w-40 lg:w-44 font-medium text-sm lg:text-base pt-1 lg:pt-0 pl-2 md:pl-4">{strings.siteSubTitle}</h2>
            </Link>
            <div className="hidden sm:flex">
                {renderNav()}
                <Feedback feedbackTrigger={feedbackTrigger} />
            </div>
        </nav>
    );
};

export default Nav;
