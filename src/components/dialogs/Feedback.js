import React, { useState, useContext, useEffect } from 'react';
import Message from '@material-ui/icons/Message';
import Close from '@material-ui/icons/Close';
import HelpOutline from '@material-ui/icons/HelpOutline';
import ErrorOutline from '@material-ui/icons/ErrorOutline';
import ChatBubbleOutline from '@material-ui/icons/ChatBubbleOutline';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import strings from '../../strings';
import LoginContext from '../../context/LoginContext';
import submitFeedback from '../../utils/api/feedback';

/**
 * Show feedback dialog
 */
const Feedback = ({ feedbackTrigger }) => {
    const { login } = useContext(LoginContext);

    const defaultFormValues = {
        message: '',
        email: login.authenticated ? login.email : '',
        type: '',
    };

    const [openModal, setOpenModal] = useState(false);
    const [formValues, setFormValues] = useState(defaultFormValues);
    const [error, setError] = useState(false);
    const types = [
        {
            value: 'HELP',
            label:
                <>
                    <HelpOutline className="align-bottom mr-4" />
                    {strings.help}
                </>,
        },
        {
            value: 'ERROR',
            label:
                <>
                    <ErrorOutline className="align-bottom mr-4" />
                    {strings.bugReport}
                </>,
        },
        {
            value: 'SUGGESTION',
            label:
                <>
                    <ChatBubbleOutline className="align-bottom mr-4" />
                    {strings.suggestion}
                </>,
        },
    ];

    /**
     * Check if other components are triggering the modal window
     */
    useEffect(() => {
        if (feedbackTrigger > 0) setOpenModal(true);
    }, [feedbackTrigger]);

    /**
     * Reset inputs on modal open/close
     */
    useEffect(() => {
        setFormValues(defaultFormValues);
    }, [openModal, login]);

    /**
     * Send report to backend
     */
    const sendReport = async () => {
        try {
            await submitFeedback(formValues);
        } catch (err) {
            setError(true);
        }
        setOpenModal(false);
    };

    /**
     * Check if form is correctly filled out
     *
     * @param {Object} e Event
     */
    const handleSubmit = (e) => {
        e.preventDefault();
        confirmAlert({
            title: strings.headerConfirm,
            message: strings.textConfirmSubmitReport,
            buttons: [
                { label: strings.yes, onClick: () => sendReport() },
                { label: strings.no }],
        });
    };

    /**
     * Render form inputs
     *
     * @returns Select and text inputs
     */
    const renderInputs = () => (
        <>
            <FormControl variant="outlined" fullWidth>
                <InputLabel id="type-label" required>{strings.labelSelectFeedback}</InputLabel>
                <Select
                    className="mb-12"
                    labelId="type-label"
                    id="type"
                    value={formValues.type}
                    variant="outlined"
                    required
                    label={strings.labelSelectFeedback}
                    fullWidth
                    onChange={(e) => setFormValues({ ...formValues, type: e.target.value })}
                    name="type"
                >
                    {types.map((type) => (
                        <MenuItem key={type.value} value={type.value}>
                            {type.label}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
            <TextField
                required
                id="message"
                name="message"
                type="text"
                disabled={formValues.type === ''}
                inputProps={{ maxLength: 280 }}
                label={strings.explainHelp}
                multiline
                rows={6}
                variant="outlined"
                fullWidth
                value={formValues.message}
                onChange={(e) => setFormValues({ ...formValues, message: e.target.value })}
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
        <>
            <span className="pt-3">
                <IconButton
                    color="primary"
                    edge="end"
                    aria-label="close"
                    onClick={() => setOpenModal(true)}
                    title={strings.titleFeedback}
                >
                    <Message />
                </IconButton>
            </span>
            <Dialog fullWidth scroll="paper" open={openModal} onClose={() => setOpenModal(false)}>
                <form className="font-sans p-2" autoComplete="off" onSubmit={handleSubmit}>
                    <DialogTitle>{strings.headerFeedback}</DialogTitle>
                    <DialogContent>
                        <span className="absolute top-1 right-4">
                            <IconButton
                                edge="end"
                                aria-label="close"
                                onClick={() => setOpenModal(false)}
                            >
                                <Close />
                            </IconButton>
                        </span>
                        <p className="p-2 mb-8">{strings.infoFeedback}</p>
                        {renderInputs()}
                        {error && <p className="error text-red-600 mb-8">{strings.errorTryAgain}</p>}
                    </DialogContent>
                    <DialogActions>
                        <Button variant="contained" color="primary" size="large" type="submit">
                            {strings.submit}
                        </Button>
                    </DialogActions>
                </form>
            </Dialog>
        </>
    );
};

export default Feedback;
