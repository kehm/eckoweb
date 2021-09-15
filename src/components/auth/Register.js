import React, { useContext, useState } from 'react';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import LocationCity from '@material-ui/icons/LocationCity';
import Button from '@material-ui/core/Button';
import strings from '../../strings';
import useFetch from '../../hooks/useFetch';
import LoginContext from '../../context/LoginContext';
import createProfile from '../../utils/create-profile';
import { validateSession } from '../../utils/api/auth';
import { createUserAffiliation } from '../../utils/api/affiliations';

/**
 * Register affiliation
 */
const Register = ({ onRegister }) => {
    const { setLogin } = useContext(LoginContext);
    const organizations = useFetch(`${process.env.REACT_APP_API_URL}/db/organizations`);
    const [organizationId, setOrganizationId] = useState();
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);

    /**
     * Submit email address and org to profile
     *
     * @param {Object} e Event
     */
    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            onRegister();
            await createUserAffiliation(organizationId);
            await validateSession();
            setLogin(createProfile(true));
            setSuccess(true);
        } catch (err) {
            setError(true);
        }
    };

    /**
     * Render select for selecting affiliation
     */
    const renderForm = () => (
        <div>
            <p className="mb-4">{strings.noteAffil}</p>
            <p className="mb-8">{strings.selectAffiliationHere}</p>
            <Autocomplete
                id="organizationId"
                fullWidth
                value={organizationId && organizations
                    ? organizations.find((element) => element.id === organizationId)
                    : null}
                onChange={(e, val) => setOrganizationId(val ? val.id : '')}
                options={organizations || []}
                getOptionLabel={(organization) => organization.name}
                noOptionsText={strings.noAlternatives}
                renderInput={(params) => <TextField {...params} label={strings.selectAffiliation} variant="outlined" />}
                disabled={success}
            />
            <p className="mb-4">{strings.infoAffilition}</p>
            <p className="mb-8">
                {strings.noAffil}
                <a href="mailto:ecko.uib.no">{strings.email}</a>
                {strings.noAffil2}
            </p>
        </div>
    );

    return (
        <div className="max-w-lg relative">
            <form onSubmit={handleSubmit} className="m-auto rounded" autoComplete="off">
                <p className="mb-6 font-semibold">{strings.registerAffiliation}</p>
                {renderForm()}
                {error && <p className="error mb-4 text-red-600">{strings.errorRegister}</p>}
                {success ? (
                    <>
                        <hr />
                        <p className="mt-4">{strings.affiliationSuccess}</p>
                    </>
                ) : (
                    <div className="absolute right-10">
                        <Button
                            variant="contained"
                            color="primary"
                            size="large"
                            type="submit"
                            startIcon={<LocationCity />}
                        >
                            {strings.buttonRegister}
                        </Button>
                    </div>
                )}
            </form>
        </div>
    );
};

export default Register;
