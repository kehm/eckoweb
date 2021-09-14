import React, { useEffect, useState } from 'react';
import { Remarkable } from 'remarkable';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import strings from '../../strings';

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
    }, []);

    /**
     * Render about section
     *
     * @returns Div with HTML
     */
    const renderAbout = () => {
        onPageView(strings.navAbout);
        return (content && content.about && (
            <div className="p-5 xl:px-48 text-left" dangerouslySetInnerHTML={{ __html: md.render(content.about.Content) }} />)
        );
    };

    /**
     * Render what is ECKO section
     *
     * @returns Div with HTML
     */
    const renderWhatIs = () => {
        onPageView(strings.navWhatIs);
        return (content && content.whatIs && (
            <div className="p-5 xl:px-48 text-left" dangerouslySetInnerHTML={{ __html: md.render(content.whatIs.Content) }} />)
        );
    };

    /**
     * Render team section
     *
     * @returns Div with HTML
     */
    const renderTeam = () => {
        onPageView(strings.navTeam);
        return (content && content.team && (
            <div className="p-5 xl:px-48 text-left" dangerouslySetInnerHTML={{ __html: md.render(content.team.Content) }} />)
        );
    };

    /**
     * Render privacy policy section
     *
     * @returns Div with HTML
     */
    const renderPrivacyPolicy = () => {
        onPageView(strings.navPrivacy);
        return (content && content.privacyPolicy && (
            <div className="p-5 xl:px-48 text-left" dangerouslySetInnerHTML={{ __html: md.render(content.privacyPolicy.Content) }} />)
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
                        className="absolute xl:right-1/2"
                        TabIndicatorProps={{ style: { opacity: 0 } }}
                    >
                        <Tab label={content && content.about ? content.about.Title : ''} />
                        <Tab label={content && content.whatIs ? content.whatIs.Title : ''} />
                        <Tab label={content && content.team ? content.team.Title : ''} />
                        <Tab label={content && content.privacyPolicy ? content.privacyPolicy.Title : ''} />
                    </Tabs>
                </AppBar>
            </div>
            <div className="sm:pt-20 pb-14 text-center leading-normal">
                {tab === 0 && renderAbout()}
                {tab === 1 && renderWhatIs()}
                {tab === 2 && renderTeam()}
                {tab === 3 && renderPrivacyPolicy()}
            </div>
        </>
    );
};

export default About;
