import React, { useState } from 'react';
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
import logo from '../../images/ORCIDiD_iconvector.svg';
import { changeUserRole } from '../../utils/api/affiliations';

/**
 * Show assign role dialog
 */
const AssignRole = ({
    open, affiliation, roles, onClose, onSuccess,
}) => {
    const [role, setRole] = useState(affiliation.role);
    const [error, setError] = useState(false);

    /**
     * Check if form is correctly filled out
     *
     * @param {Object} e Event
     */
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await changeUserRole(affiliation.id, role);
            setError(false);
            onClose();
            onSuccess();
        } catch (err) {
            setError(true);
        }
    };

    /**
     * Remove user affiliation
     */
    const removeAffiliation = async () => {
        try {
            await removeAffiliation(affiliation.id);
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
     * Render role select
     *
     * @returns Role select form control
     */
    const renderRoleSelect = () => (
        <FormControl variant="outlined" fullWidth>
            <InputLabel id="role-label" required>{strings.labelRole}</InputLabel>
            <Select
                className="mb-12"
                labelId="role-label"
                id="role"
                value={role}
                variant="outlined"
                required
                label={strings.labelRole}
                fullWidth
                onChange={(e) => setRole(e.target.value)}
                name="role"
                disabled={affiliation.role === 'ADMIN'}
            >
                {roles.map((element) => (
                    <MenuItem key={element.name} value={element.name}>
                        {`${element.name.charAt(0)}${element.name.substring(1).toLowerCase().replace(/_/g, ' ')} - ${element.description}`}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );

    /**
     * Render action buttons
     *
     * @returns Dialog actions
     */
    const renderActions = () => (
        <DialogActions>
            <Button
                variant="text"
                color="secondary"
                size="medium"
                type="button"
                onClick={() => handleRemove()}
                disabled={affiliation.role === 'ADMIN'}
            >
                {strings.buttonDeleteUserAffil}
            </Button>
            <Button
                variant="contained"
                color="primary"
                size="large"
                type="submit"
                startIcon={<SaveOutlined />}
                disabled={affiliation.role === 'ADMIN'}
            >
                {strings.buttonSave}
            </Button>
        </DialogActions>
    );

    return (
        <Dialog fullWidth scroll="paper" open={open} onClose={() => onClose()}>
            <form className="font-sans p-2" autoComplete="off" onSubmit={handleSubmit}>
                <DialogTitle>{affiliation.name}</DialogTitle>
                <DialogContent>
                    <span className="absolute top-1 right-4">
                        <IconButton
                            edge="end"
                            aria-label="close"
                            onClick={() => onClose()}
                        >
                            <Close />
                        </IconButton>
                    </span>
                    <p className="mb-4">{affiliation.email}</p>
                    <div className="mb-8">
                        <img src={logo} alt="ORCID iD logo" height={24} className="align-middle" />
                        <a
                            className="text-blue-400"
                            target="_blank"
                            rel="noopener noreferrer"
                            href={`${strings.orcidUrl}${affiliation.orcid}`}
                        >
                            {` ${strings.orcidUrl}${affiliation.orcid}`}
                        </a>
                    </div>
                    {renderRoleSelect()}
                    {error && <p className="error text-red-600 mb-8">{strings.errorTryAgain}</p>}
                </DialogContent>
                {renderActions()}
            </form>
        </Dialog>
    );
};

export default AssignRole;
