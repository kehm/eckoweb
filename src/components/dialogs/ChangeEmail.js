import React, { useState } from 'react';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import Close from '@material-ui/icons/Close';
import SaveOutlined from '@material-ui/icons/SaveOutlined';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import strings from '../../strings';
import { addEmailToProfile } from '../../utils/api/auth';

/**
 * Show change email dialog
 */
const ChangeEmail = ({
    open, onClose,
}) => {
    const [email, setEmail] = useState(undefined);
    const [error, setError] = useState(false);

    /**
     * Submit change to API
     */
    const changeEmail = async () => {
        try {
            await addEmailToProfile(email);
            setError(false);
            onClose();
        } catch (err) {
            setError(true);
        }
    };

    /**
     * Show confirm change dialog
     *
     * @param {Object} e Event
     */
    const handleChange = (e) => {
        e.preventDefault();
        confirmAlert({
            title: strings.headerConfirm,
            message: strings.textConfirm,
            buttons: [
                { label: strings.yes, onClick: () => changeEmail() },
                { label: strings.no }],
        });
    };

    return (
        <Dialog fullWidth scroll="paper" open={open} onClose={() => onClose()}>
            <form className="font-sans p-2" autoComplete="off" onSubmit={handleChange}>
                <DialogTitle>{strings.headerChangeEmail}</DialogTitle>
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
                    <p className="p-2 mb-4">{strings.infoChangeEmail}</p>
                    <TextField
                        required
                        id="email"
                        name="email"
                        type="email"
                        label={strings.labelEmail}
                        variant="outlined"
                        fullWidth
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        inputProps={{ maxLength: 60 }}
                    />
                    {error && <p className="error text-red-600 mb-8">{strings.errorTryAgain}</p>}
                </DialogContent>
                <DialogActions>
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
            </form>
        </Dialog>
    );
};

export default ChangeEmail;
