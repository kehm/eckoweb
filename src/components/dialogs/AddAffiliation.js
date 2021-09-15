import React, { useEffect, useState } from 'react';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import Close from '@material-ui/icons/Close';
import SaveOutlined from '@material-ui/icons/SaveOutlined';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import strings from '../../strings';
import useFetch from '../../hooks/useFetch';
import { createUserAffiliation } from '../../utils/api/affiliations';

/**
 * Show add affiliation dialog
 */
const AddAffiliation = ({
    open, organizationId, onClose, onSuccess,
}) => {
    const organizations = useFetch(`${process.env.REACT_APP_API_URL}/db/organizations`);
    const [affiliations, setAffilitions] = useState(undefined);
    const [organization, setOrganization] = useState('');
    const [error, setError] = useState(false);

    /**
     * Remove current affiliation from options
     */
    useEffect(() => {
        if (!affiliations && organizations.length > 0) {
            setAffilitions(organizations.filter((element) => element.id !== organizationId));
        }
    }, [organizations]);

    /**
     * Check if form is correctly filled out
     *
     * @param {Object} e Event
     */
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await createUserAffiliation(organization);
            setError(false);
            onClose();
            onSuccess();
        } catch (err) {
            setError(true);
        }
    };

    /**
     * Remove existing affiliation
     */
    const removeAffiliation = async () => {
        try {
            await removeAffiliation(organizationId);
            setError(false);
            onClose();
            onSuccess();
        } catch (err) {
            setError(true);
        }
    };

    /**
     * Show confirm delete dialog
     */
    const handleRemove = async () => {
        confirmAlert({
            title: strings.headerConfirm,
            message: strings.textConfirmRemove,
            buttons: [
                { label: strings.yes, onClick: () => removeAffiliation() },
                { label: strings.no }],
        });
    };

    /**
     * Render action buttons
     *
     * @returns Dialog actions
     */
    const renderActions = () => (
        <DialogActions>
            {organizationId && (
                <Button
                    variant="text"
                    color="secondary"
                    size="medium"
                    type="button"
                    onClick={() => handleRemove()}
                >
                    {strings.buttonDeleteAffiliation}
                </Button>
            )}
            <Button
                variant="contained"
                color="primary"
                size="large"
                type="submit"
                startIcon={<SaveOutlined />}
            >
                {strings.buttonSave}
            </Button>
        </DialogActions>
    );

    return (
        <Dialog fullWidth scroll="paper" open={open} onClose={() => { setOrganization(''); onClose(); }}>
            <form className="font-sans p-2" autoComplete="off" onSubmit={handleSubmit}>
                <DialogTitle>{strings.changeAffiliation}</DialogTitle>
                <DialogContent>
                    <span className="absolute top-1 right-4">
                        <IconButton
                            edge="end"
                            aria-label="close"
                            onClick={() => { setOrganization(''); onClose(); }}
                        >
                            <Close />
                        </IconButton>
                    </span>
                    <p className="p-2 mb-4">{strings.setAffiliation}</p>
                    <p className="p-2 mb-8">{strings.noteChangeAffil}</p>
                    {affiliations && (
                        <FormControl variant="outlined" fullWidth>
                            <InputLabel id="role-label" required>{strings.selectAffiliation}</InputLabel>
                            <Select
                                className="mb-12"
                                labelId="organization-label"
                                id="organization"
                                value={organization}
                                variant="outlined"
                                required
                                label={strings.selectAffiliation}
                                fullWidth
                                onChange={(e) => setOrganization(e.target.value)}
                                name="organization"
                            >
                                {affiliations.map((affiliation) => (
                                    <MenuItem key={affiliation.id} value={affiliation.id}>
                                        {affiliation.name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    )}
                    {error && <p className="error text-red-600 mb-8">{strings.errorTryAgain}</p>}
                </DialogContent>
                {renderActions()}
            </form>
        </Dialog>
    );
};

export default AddAffiliation;
