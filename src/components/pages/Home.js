import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Remarkable } from 'remarkable';
import Button from '@material-ui/core/Button';
import strings from '../../strings';
import imgHome from '../../images/bg-home.png';
import bg1 from '../../images/ecko-chain.png';
import bg2 from '../../images/ecko-web.png';
import bg3 from '../../images/ecko-team.png';

/**
 * Render home page
 */
const Home = ({ content, onNavSelect }) => {
    const md = new Remarkable();

    /**
     * Scroll to top on first page load
     */
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <>
            <div className="even w-full text-darkGrey text-center">
                <img src={imgHome} alt="Home background" height={706} width={1920} className="hidden lg:inline relative h-auto max-w-full" />
                {content && content.homeBlock1 && (
                    <div className="absolute top-36 xl:top-64 w-full m-auto">
                        <h1 className="px-5 md:px-0">{content.homeBlock1.Title}</h1>
                        <div className="p-5" dangerouslySetInnerHTML={{ __html: md.render(content.homeBlock1.Content) }} />
                        <div className="flex w-full es:w-96 m-auto mt-3">
                            <div className="m-auto">
                                <Button
                                    variant="contained"
                                    color="primary"
                                    size="medium"
                                    type="button"
                                    component={Link}
                                    to="/submit"
                                    onClick={() => onNavSelect()}
                                >
                                    {strings.navContribute}
                                </Button>
                            </div>
                            <div className="m-auto">
                                <Button
                                    variant="contained"
                                    color="secondary"
                                    size="medium"
                                    type="button"
                                    component={Link}
                                    to="/datasets"
                                    onClick={() => onNavSelect()}
                                >
                                    {strings.navFind}
                                </Button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
            <div className="even bg-white w-full py-12 text-darkGrey text-center md:text-left leading-relaxed -mt-1">
                <div className="flex w-full xl:w-4/5 m-auto">
                    <img src={bg1} alt="Blockchain illustration" height={320} width={533} className="hidden md:inline h-56 mt-16 lg:h-72 xl:h-80 lg:mt-6 ml-6 xl:ml-0" />
                    {content && content.homeBlock2 && (
                        <div className="p-5 mt-6">
                            <h1 className="px-5 md:px-0 mb-4">{content.homeBlock2.Title}</h1>
                            <div className="mb-6" dangerouslySetInnerHTML={{ __html: md.render(content.homeBlock2.Content) }} />
                            <Button
                                variant="contained"
                                color="primary"
                                size="medium"
                                type="button"
                                component={Link}
                                to="/about/about"
                                onClick={() => onNavSelect()}
                            >
                                {strings.buttonReadMore}
                            </Button>
                        </div>
                    )}
                </div>
            </div>
            <div className="even bg-mainDark w-full py-12 text-white text-center md:text-left leading-relaxed">
                <div className="flex w-full xl:w-4/5 m-auto">
                    {content && content.homeBlock3 && (
                        <div className="p-5 mt-6 pl-6">
                            <h1 className="px-5 md:px-0 mb-4 text-white">{content.homeBlock3.Title}</h1>
                            <div className="mb-6" dangerouslySetInnerHTML={{ __html: md.render(content.homeBlock3.Content) }} />
                            <Button
                                variant="contained"
                                color="primary"
                                size="medium"
                                type="button"
                                component={Link}
                                to="/about/about"
                                onClick={() => onNavSelect()}
                            >
                                {strings.buttonExplore}
                            </Button>
                        </div>
                    )}
                    <img src={bg2} alt="Website illustration" height={320} width={533} className="hidden md:inline h-56 mt-16 lg:h-72 xl:h-80 lg:mt-6 ml-6 xl:ml-0 pr-5" />
                </div>
            </div>
            <div className="even bg-white w-full py-12 text-darkGrey text-center md:text-left leading-relaxed">
                <div className="flex w-full xl:w-4/5 m-auto">
                    <img src={bg3} alt="Team illustration" height={320} width={533} className="hidden md:inline h-56 mt-16 lg:h-72 xl:h-80 lg:mt-6 ml-6 xl:ml-0" />
                    {content && content.homeBlock4 && (
                        <div className="p-5 mt-6">
                            <h1 className="px-5 md:px-0 mb-4">{content.homeBlock4.Title}</h1>
                            <div className="mb-6" dangerouslySetInnerHTML={{ __html: md.render(content.homeBlock4.Content) }} />
                            <Button
                                variant="contained"
                                color="primary"
                                size="medium"
                                type="button"
                                component={Link}
                                to="/about/team"
                                onClick={() => onNavSelect()}
                            >
                                {strings.buttonMeet}
                            </Button>
                        </div>
                    )}
                </div>
            </div>
            <div className="absolute bg-white bottom-0 w-full py-6 text-xs text-center font-medium lg:text-sm">
                <p className="pb-2">
                    {strings.bgImg}
                    <a className="text-darkGrey" target="_blank" rel="noopener noreferrer" href={strings.urlVues}>
                        {strings.bgImgName}
                    </a>
                    {` ${strings.by} ${strings.bgImgOwner}, ${strings.usedUnder} `}
                    <a
                        className="text-darkGrey"
                        target="_blank"
                        rel="noopener noreferrer"
                        href={strings.urlCCBY40}
                    >
                        {strings.ccby40}
                    </a>
                    {` | ${strings.bgImgChanges}`}
                </p>
                <p>
                    {strings.copyright}
                    &copy;
                    {` ${strings.year} ${strings.depName} | ${strings.allRightsReserved}`}
                </p>
            </div>
        </>
    );
};

export default Home;
