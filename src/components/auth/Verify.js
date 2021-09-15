import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router';
import Button from '@material-ui/core/Button';
import HomeOutlined from '@material-ui/icons/HomeOutlined';
import MailOutline from '@material-ui/icons/MailOutline';
import { Link } from 'react-router-dom';
import strings from '../../strings';
import LoginContext from '../../context/LoginContext';
import createProfile from '../../utils/create-profile';
import { requestToken } from '../../utils/api/auth';

/**
 * Render email verified
 */
const Verify = () => {
    const { setLogin } = useContext(LoginContext);
    const history = useHistory();
    const [sent, setSent] = useState(false);
    const [error, setError] = useState(false);

    /**
     * Request new token to be sent by email
     */
    const sendLink = async () => {
        try {
            await requestToken();
            setSent(true);
        } catch (err) {
            setError(true);
        }
    };

    /**
     * Reset email address
     */
    const resetEmail = async () => {
        try {
            await resetEmail();
            setLogin(createProfile(false));
            history.push('/auth/signin');
        } catch (err) {
            setError(true);
        }
    };

    return (
        <div className="py-12 m-auto max-w-lg relative">
            <h1 className="mb-10">{strings.pleaseVerifyEmail}</h1>
            <p>{strings.mustVerify}</p>
            <p className="mt-6 mb-10">{sent ? strings.linkSent : strings.notReceive}</p>
            {error && <p className="error mb-4 text-red-600">{strings.errorTryAgain}</p>}
            <Button
                variant="contained"
                color="primary"
                size="large"
                type="button"
                endIcon={<HomeOutlined />}
                component={Link}
                to="/"
            >
                {strings.buttonHome}
            </Button>
            {!sent && (
                <span className="mx-3">
                    <Button
                        variant="contained"
                        color="secondary"
                        size="large"
                        type="button"
                        endIcon={<MailOutline />}
                        onClick={() => sendLink()}
                    >
                        {strings.sendLink}
                    </Button>
                </span>
            )}
            <Button
                variant="text"
                color="secondary"
                size="medium"
                type="button"
                onClick={() => resetEmail()}
            >
                {strings.buttonResetEmail}
            </Button>
        </div>
    );
};

export default Verify;
