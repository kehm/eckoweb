import React, { useState } from 'react';
import { useHistory } from 'react-router';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import AlternateEmailOutlined from '@material-ui/icons/AlternateEmailOutlined';
import strings from '../../strings';
import logo from '../../images/ORCIDiD_iconvector.svg';
import { addEmailToProfile } from '../../utils/api/auth';

/**
 * Sign Up with email address
 */
const SignUp = ({ status }) => {
    const defaultFormValues = {
        email: '',
    };
    const [formValues, setFormValues] = useState(defaultFormValues);
    const history = useHistory();
    const [error, setError] = useState(false);

    /**
     * Submit email address and org to profile
     *
     * @param {Object} e Event
     */
    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            await addEmailToProfile(formValues.email);
            history.push({ pathname: '/auth/success', state: { success: true } });
        } catch (err) {
            setError(true);
        }
    };

    /**
     * Render select for selecting affiliation
     */
    const renderForm = () => (
        <div>
            <p className="mb-8">{strings.pleaseRegister}</p>
            <TextField
                required
                id="email"
                name="email"
                type="email"
                label={strings.labelEmail}
                variant="outlined"
                fullWidth
                value={formValues.email}
                onChange={(e) => setFormValues({ ...formValues, email: e.target.value })}
                inputProps={{ maxLength: 60 }}
            />
            <p className="mb-8">{strings.emailVerify}</p>
        </div>
    );

    return (
        <div className="px-4 relative max-w-lg pb-14 m-auto text-left">
            {status === 'signup' && (
                <form onSubmit={handleSubmit} className="m-auto rounded" autoComplete="off">
                    <h1 className="pb-2">{strings.welcome}</h1>
                    <p className="mb-6 font-semibold">
                        {strings.orcidSuccess}
                        <img src={logo} alt="ORCID iD logo" height={32} className="align-bottom ml-2" />
                    </p>
                    {renderForm()}
                    {error && <p className="error mb-4 text-red-600">{strings.errorRegister}</p>}
                    <div className="absolute right-10">
                        <Button
                            variant="contained"
                            color="primary"
                            size="large"
                            type="submit"
                            startIcon={<AlternateEmailOutlined />}
                        >
                            {strings.buttonRegister}
                        </Button>
                    </div>
                </form>
            )}
        </div>
    );
};

export default SignUp;
