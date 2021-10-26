import React, { useEffect, useState } from 'react';
import { Remarkable } from 'remarkable';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import strings from '../../strings';
import bg1 from '../../images/ecko-chain.png';
import imgHome from '../../images/bg-home.png';

/**
 * Render about page
 */
const About = ({ props, content, onPageView }) => {
    const md = new Remarkable();
    const [tab, setTab] = useState(0);

    /**
     * Scroll to top on first page load
     */
    useEffect(() => {
        window.scrollTo(0, 0);
        switch (props.match.params.page) {
            case 'about':
                setTab(0);
                break;
            case 'whatis':
                setTab(1);
                break;
            case 'team':
                setTab(2);
                break;
            case 'privacy':
                setTab(3);
                break;
            default:
                setTab(0);
                break;
        }
    }, [props.match.params]);

    /**
     * Render about section
     *
     * @returns Div with HTML
     */
    const renderAbout = () => {
        onPageView(strings.navAbout);
        return content && content.about && (
            <div className="px-2 lg:px-10 bg-gray-200 pt-2 pb-20">
                <div className="lg:flex lg:mt-20">
                    <div>
                        <h1 className="px-5 md:px-0 mb-4">{strings.navAbout}</h1>
                        <div className="mb-6" dangerouslySetInnerHTML={{ __html: md.render(content.about.Content) }} />
                    </div>
                    <div className="mt-20">
                        <img src={imgHome} alt="Blockchain illustration" height={320} width={533} className="hidden md:inline h-56 lg:h-72 xl:h-80 lg:mt-6 ml-10 rounded border border-solid" />
                    </div>
                </div>
            </div>
        );
    };

    /**
     * Render what is ECKO section
     *
     * @returns Div with HTML
     */
    const renderWhatIs = () => {
        onPageView(strings.navWhatIs);
        return content && content.whatIs && (
            <div className="px-2 lg:px-10 bg-gray-200 pt-2 pb-20">
                <div className="lg:flex lg:mt-20">
                    <div>
                        <h1 className="px-5 md:px-0 mb-4">{strings.navWhatIs}</h1>
                        <img src={bg1} alt="Blockchain illustration" height={320} width={533} className="hidden md:inline h-56 lg:h-72 xl:h-80 lg:mt-6 mr-10 rounded border border-solid" />
                    </div>
                    <div className="mb-6" dangerouslySetInnerHTML={{ __html: md.render(content.whatIs.Content) }} />
                </div>
            </div>
        );
    };

    /**
     * Render team section
     *
     * @returns Div with HTML
     */
    const renderTeam = () => {
        onPageView(strings.navTeam);
        return content && content.team && (
            <div className="px-2 lg:px-10 bg-gray-200 pt-2 pb-20">
                <div className="lg:mt-20">
                    <h1 className="px-5 md:px-0 mb-4">{strings.navTeam}</h1>
                    <div className="mb-6" dangerouslySetInnerHTML={{ __html: md.render(content.team.Content) }} />
                </div>
            </div>
        );
    };

    /**
     * Render privacy policy section
     *
     * @returns Div with HTML
     */
    const renderPrivacyPolicy = () => {
        onPageView(strings.navPrivacy);
        return content && content.privacyPolicy && (
            <div className="px-2 lg:px-10 bg-gray-200 pt-2 pb-20">
                <div className="lg:mt-20">
                    <h1 className="px-5 md:px-0 mb-4">{strings.navPrivacy}</h1>
                    <div className="mb-6" dangerouslySetInnerHTML={{ __html: md.render(content.privacyPolicy.Content) }} />
                </div>
            </div>
        );
    };

    return (
        <>
            <div className="w-full hidden sm:inline">
                <AppBar position="relative" color="transparent">
                    <Tabs
                        value={tab}
                        onChange={(e, val) => setTab(val)}
                        aria-label="about tabs"
                        className="absolute xl:right-1/2 text-black"
                        TabIndicatorProps={{ style: { opacity: 0 } }}
                    >
                        <Tab label={content && content.about ? content.about.Title : ''} />
                        <Tab label={content && content.whatIs ? content.whatIs.Title : ''} />
                        <Tab label={content && content.team ? content.team.Title : ''} />
                        <Tab label={content && content.privacyPolicy ? content.privacyPolicy.Title : ''} />
                    </Tabs>
                </AppBar>
            </div>
            <div className="sm:pt-2 pb-14 sm:mt-10 leading-normal">
                {tab === 0 && renderAbout()}
                {tab === 1 && renderWhatIs()}
                {tab === 2 && renderTeam()}
                {tab === 3 && renderPrivacyPolicy()}
            </div>
        </>
    );
};

export default About;
