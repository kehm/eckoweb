import React, { useEffect, useState } from 'react';
import { Remarkable } from 'remarkable';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import strings from '../../strings';
import bg1 from '../../images/ecko-chain.png';

/**
 * Render about page
 */
const About = ({ props, content, onPageView }) => {
    const md = new Remarkable({ html: true, breaks: true });
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
            case 'privacy':
                setTab(1);
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
            <div className="px-2 lg:px-10 pt-2 pb-20 border-solid border-0 border-t-2 border-gray-100">
                <div className="lg:flex lg:mt-10">
                    <div>
                        <h1 className="px-5 md:px-0 mb-4">{content.about.Title}</h1>
                        <img src={bg1} alt="Blockchain illustration" height={320} width={533} className="hidden md:inline h-56 lg:h-72 xl:h-80 lg:mt-6 mr-10 rounded border border-solid" />
                    </div>
                    <div className="mb-6" dangerouslySetInnerHTML={{ __html: md.render(content.about.Content) }} />
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
            <div className="px-2 lg:px-10 pt-2 pb-20 border-solid border-0 border-t-2 border-gray-100">
                <div className="lg:mt-10">
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
                        <Tab label={content && content.privacyPolicy ? content.privacyPolicy.Title : ''} />
                    </Tabs>
                </AppBar>
            </div>
            <div className="sm:pt-2 pb-14 sm:mt-10 leading-normal">
                {tab === 0 && renderAbout()}
                {tab === 1 && renderPrivacyPolicy()}
            </div>
        </>
    );
};

export default About;
