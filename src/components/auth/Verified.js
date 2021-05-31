import React from 'react';
import Button from '@material-ui/core/Button';
import ExitToApp from '@material-ui/icons/ExitToApp';
import { Link } from 'react-router-dom';
import strings from '../../strings';

/**
 * Render email verified
 */
const Verified = () => (
    <div className="py-12 m-auto max-w-lg relative">
        <h1 className="mb-10">{strings.welcome}</h1>
        <p className="mb-10">{strings.emailVerified}</p>
        <Button
            variant="contained"
            color="primary"
            size="large"
            type="button"
            endIcon={<ExitToApp />}
            component={Link}
            to="/auth/signin"
        >
            {strings.goSignIn}
        </Button>
    </div>
);

export default Verified;
