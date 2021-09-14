import React, { useContext, useEffect } from 'react';
import { Redirect, useHistory } from 'react-router';
import OpenInNewOutlined from '@material-ui/icons/OpenInNewOutlined';
import LoginContext from '../../context/LoginContext';
import strings from '../../strings';
import logo from '../../images/ORCIDiD_iconvector.svg';
import InfoPopover from '../components/InfoPopover';
import createProfile from '../../utils/create-profile';
import SignUp from './SignUp';

/**
 * Sign in with the backend API
 */
const SignIn = ({ props, onPageView }) => {
    const { login, setLogin } = useContext(LoginContext);
    const history = useHistory();

    /**
     * Check if success or signup required
     */
    useEffect(() => {
        onPageView(strings.navContribute);
        if (props.match.params.status === 'success') {
            setLogin(createProfile(true));
            history.push('/submit');
        }
    }, [history, login, props]);

    return (
        <div className="pt-8 lg:pt-16 text-center">
            {props.match.params.status === 'error'
                && (login.authenticated ? <Redirect to="/home" />
                    : <p className="error mt-0 text-red-600">{strings.errorSignIn}</p>
                )}
            {(props.match.params.status === 'signin' || props.match.params.status === 'error')
                && (login.authenticated ? <Redirect to="/home" />
                    : (
                        <div className="relative m-auto p-4">
                            <h1 className="py-12">{strings.orcidSignIn}</h1>
                            <p className="mb-12 sm:w-96 m-auto">{strings.signInInfo}</p>
                            <form action={`${process.env.REACT_APP_API_URL}/auth/orcid`}>
                                <button
                                    type="submit"
                                    className="rounded py-4 px-6 border-none text-base font-medium transition-all cursor-pointer shadow-md m-auto bg-white hover:bg-gray-200"
                                >
                                    <img src={logo} alt="ORCID iD logo" height={32} className="align-middle" />
                                    <p className="inline-block align-middle pl-2 pr-1 text-base">{strings.buttonOrcid}</p>
                                </button>
                            </form>
                            <p className="mt-10">
                                <InfoPopover content={strings.orcidInfo} placement="right-start" />
                                &nbsp;
                                {strings.orcidRegister}
                                &nbsp;
                                <a
                                    className="text-blue-400 block sm:inline"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    href={strings.urlOrcidReg}
                                    title={strings.urlOrcidReg}
                                >
                                    <OpenInNewOutlined className="align-middle" />
                                    &nbsp;
                                    {strings.registerNow}
                                </a>
                            </p>
                        </div>
                    )
                )}
            {props.match.params.status === 'signup' && <SignUp status={props.match.params.status} />}
        </div>
    );
};

export default SignIn;
