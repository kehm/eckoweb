import React, { useState, useEffect, useCallback } from 'react';
import {
  BrowserRouter, Switch,
  Route, Redirect,
} from 'react-router-dom';
import { useHistory } from 'react-router';
import debounce from 'lodash/debounce';
import { getCookieConsentValue } from 'react-cookie-consent';
import '../styles/tailwind.css';
import '../styles/styles.css';
import { ThemeProvider } from '@material-ui/core/styles';
import materialTheme from '../styles/material-ui';
import Nav from './nav/Nav';
import Home from './pages/Home';
import Submit from './pages/auth/Submit';
import Contributions from './pages/auth/Contributions';
import Contracts from './pages/auth/Contracts';
import Profile from './pages/auth/Profile';
import About from './pages/About';
import Datasets from './pages/Datasets';
import Map from './components/Map';
import SignIn from './auth/SignIn';
import LoginContext from '../context/LoginContext';
import NoMatch from './pages/NoMatch';
import Expired from './pages/Expired';
import strings from '../strings';
import useFetch from '../hooks/useFetch';
import Metrics from './components/Metrics';
import createProfile from '../utils/create-profile';
import Footer from './nav/Footer';
import Verified from './auth/Verified';
import Privileged from './auth/Privileged';
import Verify from './auth/Verify';
import TokenExpired from './auth/TokenExpired';
import CookieNotice from './components/CookieNotice';
import trackPageView from '../utils/analytics';
import { invalidateSession, validateSession } from '../utils/api/auth';
import { getDatasetCoordinates } from '../utils/metadata-parser';
import AuthHeader from './components/AuthHeader';

const App = () => {
  // Set initial state
  const loginState = {
    authenticated: false,
    orcid: undefined,
    name: undefined,
    email: undefined,
    organization: undefined,
    role: undefined,
  };

  // Get content from CMS
  const homeContent = {
    homeBlock1: useFetch(`${process.env.REACT_APP_CMS_URL}/${process.env.REACT_APP_CMS_HOME_1_ID}`),
    homeBlock2: useFetch(`${process.env.REACT_APP_CMS_URL}/${process.env.REACT_APP_CMS_HOME_2_ID}`),
    homeBlock3: useFetch(`${process.env.REACT_APP_CMS_URL}/${process.env.REACT_APP_CMS_HOME_3_ID}`),
    homeBlock4: useFetch(`${process.env.REACT_APP_CMS_URL}/${process.env.REACT_APP_CMS_HOME_4_ID}`),
  };

  const aboutContent = {
    about: useFetch(`${process.env.REACT_APP_CMS_URL}/${process.env.REACT_APP_CMS_ABOUT_ID}`),
    privacyPolicy: useFetch(`${process.env.REACT_APP_CMS_URL}/${process.env.REACT_APP_CMS_PRIVACY_POLICY_ID}`),
  };

  const [login, setLogin] = useState(loginState);
  const loginValue = { login, setLogin };
  const [cookieConsent, setCookieConsent] = useState(getCookieConsentValue());
  const [secondaryNav, setSecondaryNav] = useState(0); // Re-render on footer nav clicks
  const [showMap, setShowMap] = useState(true); // Hide map when changing orientation
  const [mapWidth, setMapWidth] = useState(0); // Re-render map on window resize
  const [authCompleted, setAuthCompleted] = useState(false);
  const [feedbackTrigger, setFeedbackTrigger] = useState(0);
  const datasets = useFetch(`${process.env.REACT_APP_API_URL}/datasets/metadata`);

  /**
   * Resize map on site size change and orientation change
   */
  const resizeMap = () => {
    setShowMap(false);
    setTimeout(() => setMapWidth(window.innerWidth), 500);
  };

  /**
   * Add event listener for resize (for Map)
   */
  useEffect(() => {
    window.addEventListener('resize', () => resizeMap());
    return () => {
      window.removeEventListener('resize', () => resizeMap());
    };
  }, []);

  /**
   * Render map after new width has been calculated
   */
  useEffect(() => {
    setShowMap(true);
  }, [mapWidth]);

  /**
   * Check for cookie consent and initialize Google Analytics
   */
  useEffect(() => {
    if (getCookieConsentValue() !== cookieConsent) {
      setCookieConsent(getCookieConsentValue());
    }
  }, [cookieConsent]);

  /**
   * Authenticate with API
   */
  useEffect(() => {
    if (!authCompleted) {
      const authenticate = async () => {
        try {
          await validateSession();
          if (!login.authenticated) setLogin(createProfile(true));
        } catch (err) {
          if (login.authenticated) setLogin(createProfile(false));
        }
        setAuthCompleted(true);
      };
      authenticate();
    }
  }, [login, authCompleted]);

  /**
   * Invalidate session
   */
  const invalidate = async () => {
    try {
      await invalidateSession();
      setLogin(createProfile(false));
    } catch (err) { }
  };

  /**
   * Check if user is authenticated and if email is verified
   *
   * @param {Object} component Component to be rendered
   * @param {string} role Required role (optional)
   * @returns Component
   */
  const isAuthenticated = (component, role) => {
    if (login.authenticated) {
      if (login.status === 'VERIFIED') {
        if (role && role !== login.role) {
          return <Redirect to="/privileged" />;
        }
        return component;
      }
      if (login.status === 'NOT_VERIFIED') {
        return <Redirect to="/verify" />;
      }
    }
    return <Redirect to="/auth/signin" />;
  };

  /**
   * Handle page view tracking
   */
  const handlePageView = useCallback(debounce(async (title) => trackPageView(title), 500), []);

  /**
   * Render single-page layout
   */
  const renderPage = () => {
    const history = useHistory();
    handlePageView(strings.navHome);
    if (window.location.pathname.includes('/home')) setSecondaryNav('home');
    return (
      <div className="mb-64 pb-4">
        <Home
          content={homeContent}
          onNavSelect={() => setSecondaryNav(secondaryNav + 1)}
        />
        <Metrics />
        {showMap && (
          <Map
            height="450px"
            markers={datasets && getDatasetCoordinates(datasets)}
            onClickMarker={(id) => { setSecondaryNav(secondaryNav + 1); history.push(`/datasets/${id}`); }}
          />
        )}
        <Footer onNavSelect={() => setSecondaryNav(secondaryNav + 1)} />
      </div>
    );
  };

  return (
    <BrowserRouter>
      <LoginContext.Provider value={loginValue}>
        <ThemeProvider theme={materialTheme}>
          {authCompleted && (
            <div className="bg-white text-darkGrey font-sans absolute w-full min-h-full">
              <Nav
                secondaryNav={secondaryNav}
                onClickSignOut={() => invalidate()}
                feedbackTrigger={feedbackTrigger}
              />
              {login.authenticated && (
                <AuthHeader
                  login={login}
                  onSignOut={() => { invalidate(); setSecondaryNav(secondaryNav + 1); }}
                />
              )}
              <div className="border-solid border-0 border-t-2 border-gray-100">
                <Switch>
                  <Route path="(/|/home)" exact component={() => renderPage()} />
                  <Route
                    path="/about/:page"
                    render={(props) => (
                      <About
                        props={props}
                        content={aboutContent}
                        onPageView={(title) => handlePageView(title)}
                      />
                    )}
                  />
                  <Route path="/expired" exact component={Expired} />
                  <Route
                    path="/datasets"
                    exact
                    render={() => (
                      <Datasets
                        showMap={showMap}
                        onNav={() => setSecondaryNav(secondaryNav + 1)}
                        onPageView={(title) => handlePageView(title)}
                      />
                    )}
                  />
                  <Route
                    path="/datasets/:id"
                    render={() => (
                      <Datasets
                        onNav={() => setSecondaryNav(secondaryNav + 1)}
                        onPageView={(title) => handlePageView(title)}
                      />
                    )}
                  />
                  <Route path="/profile" exact render={() => isAuthenticated(<Profile triggerFeedback={() => setFeedbackTrigger(feedbackTrigger + 1)} />)} />
                  <Route path="/submit" exact render={() => isAuthenticated(<Submit onNav={() => setSecondaryNav(secondaryNav + 1)} />)} />
                  <Route path="/edit/:id" exact render={() => isAuthenticated(<Submit onNav={() => setSecondaryNav(secondaryNav + 1)} edit />)} />
                  <Route path="/contracts" exact render={() => isAuthenticated(<Contracts />)} />
                  <Route path="/contributions" exact render={() => isAuthenticated(<Contributions onNav={() => setSecondaryNav(secondaryNav + 1)} />)} />
                  <Route path="/contributions/:id" exact render={() => isAuthenticated(<Contributions onNav={() => setSecondaryNav(secondaryNav + 1)} />)} />
                  <Route path="/auth/:status" exact render={(props) => <SignIn props={props} onPageView={(title) => handlePageView(title)} />} />
                  <Route path="/verified" exact component={Verified} />
                  <Route path="/token-expired" exact component={TokenExpired} />
                  <Route path="/privileged" exact component={Privileged} />
                  <Route
                    path="/verify"
                    exact
                    render={() => {
                      if (login.authenticated) {
                        if (login.status === 'VERIFIED') return <Redirect to="/" />;
                        return <Verify />;
                      }
                      return <Redirect to="/auth/signin" />;
                    }}
                  />
                  <Route component={NoMatch} />
                </Switch>
              </div>
            </div>
          )}
          <CookieNotice onConsent={() => setCookieConsent(getCookieConsentValue())} />
        </ThemeProvider>
      </LoginContext.Provider>
    </BrowserRouter>
  );
};

export default App;
