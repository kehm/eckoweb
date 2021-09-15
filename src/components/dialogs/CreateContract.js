import React, { useState, useContext, useEffect } from 'react';
import Close from '@material-ui/icons/Close';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import SpeakerNotesOutlined from '@material-ui/icons/SpeakerNotesOutlined';
import IconButton from '@material-ui/core/IconButton';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import strings from '../../strings';
import LoginContext from '../../context/LoginContext';
import ProgressIndicator from '../components/ProgressIndicator';
import { submitProposal } from '../../utils/api/contracts';

/**
 * Show create contract dialog
 */
const CreateContract = ({
    open, dataset, onClose, onSuccess,
}) => {
    const { login } = useContext(LoginContext);
    const defaultFormValues = {
        proposal: '',
        email: login.authenticated ? login.email : '',
    };
    const [formValues, setFormValues] = useState(defaultFormValues);
    const [showProgress, setShowProgress] = useState(false);
    const [error, setError] = useState(false);

    /**
     * Handle successful proposal
     */
    const handleSuccess = () => {
        onSuccess();
        onClose();
        setShowProgress(false);
    };

    /**
     * Send request to API
     */
    const submitRequest = async () => {
        try {
            await submitProposal(dataset.id, formValues.proposal);
            setTimeout(handleSuccess, 1000);
        } catch (err) {
            setError(true);
            setShowProgress(false);
        }
    };

    /**
     * Submit request after progress indicator is displayed
     */
    useEffect(() => {
        if (showProgress) submitRequest();
    }, [showProgress]);

    /**
     * Check if form is correctly filled out
     *
     * @param {Object} e Event
     */
    const handleSubmit = (e) => {
        e.preventDefault();
        confirmAlert({
            title: strings.headerConfirm,
            message: strings.textConfirmSubmitRequest,
            buttons: [
                { label: strings.yes, onClick: () => setShowProgress(true) },
                { label: strings.no }],
        });
    };

    /**
     * Render form inputs
     *
     * @returns Text inputs
     */
    const renderInputs = () => (
        <>
            <TextField
                required
                id="proposal"
                name="proposal"
                type="text"
                disabled={formValues.type === ''}
                inputProps={{ maxLength: 560 }}
                label={strings.labelProposal}
                multiline
                rows={6}
                variant="outlined"
                fullWidth
                value={formValues.proposal}
                onChange={(e) => setFormValues({ ...formValues, proposal: e.target.value })}
            />
            <TextField
                required
                id="email"
                name="email"
                type="email"
                disabled={formValues.type === '' || (login.authenticated && login.email)}
                inputProps={{ maxLength: 280 }}
                label={strings.labelEmail}
                variant="outlined"
                fullWidth
                value={formValues.email}
                onChange={(e) => setFormValues({ ...formValues, email: e.target.value })}
            />
        </>
    );

    return (
        <Dialog fullWidth scroll="paper" open={open} onClose={() => onClose()}>
            <form className="font-sans p-2" autoComplete="off" onSubmit={handleSubmit}>
                <DialogTitle>{strings.headerProposal}</DialogTitle>
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
                    <p className="mb-2 font-light">{strings.infoTerms}</p>
                    <p className="font-semibold mb-8">{dataset.policy ? dataset.policy.terms : ''}</p>
                    <p className="mb-4">{strings.proposalRequired}</p>
                    <p className="mb-8">{strings.contractCreate}</p>
                    {renderInputs()}
                    <p className="mb-4">{strings.proposeNew}</p>
                    {error && <p className="error text-red-600 mb-8">{strings.errorTryAgain}</p>}
                </DialogContent>
                <DialogActions>
                    <Button variant="contained" color="primary" size="large" type="submit" endIcon={<SpeakerNotesOutlined />}>
                        {strings.buttonRequest}
                    </Button>
                </DialogActions>
            </form>
            <ProgressIndicator open={showProgress} />
        </Dialog>
    );
};

export default CreateContract;
