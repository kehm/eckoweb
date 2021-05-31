import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Close from '@material-ui/icons/Close';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import strings from '../../strings';
import ProgressIndicator from '../components/ProgressIndicator';
import formatDate from '../../utils/format-date';
import logo from '../../images/ORCIDiD_iconvector.svg';
import LicenseLink from '../components/LicenseLink';

/**
 * Show resolve contract dialog
 */
const Contract = ({
    open, contract, type, onClose, onSuccess,
}) => {
    const [response, setResponse] = useState('');
    const [resolve, setResolve] = useState(undefined);
    const [error, setError] = useState(false);

    /**
     * Resolve request
     *
     * @param {boolean} accept True if accept
     */
    const resolveContract = async (accept) => {
        try {
            await axios.post(`${process.env.REACT_APP_API_URL}/contracts/resolve`, {
                contractId: contract.id,
                accept,
                response: !accept ? response : undefined,
            }, {
                headers: {
                    'Content-Type': 'application/json',
                },
                timeout: process.env.REACT_APP_HTTP_TIMEOUT,
            });
            onSuccess();
            onClose();
            setError(false);
        } catch (err) {
            setError(true);
        }
        setResolve(undefined);
    };

    /**
     * Trigger resolve and progress indicator
     */
    useEffect(() => {
        if (resolve !== undefined) resolveContract(resolve);
    }, [resolve]);

    /**
     * Resolve contract
     *
     * @param {boolean} approve True if accept
     */
    const handleResolve = (accept) => {
        if (accept || response !== '') {
            confirmAlert({
                title: strings.headerConfirm,
                message: accept ? strings.textConfirmAccept : strings.textConfirmReject,
                buttons: [
                    { label: strings.yes, onClick: () => setResolve(accept) },
                    { label: strings.no }],
            });
        }
    };

    /**
     * Withdraw proposal
     */
    const withdrawProposal = async () => {
        try {
            await axios.post(`${process.env.REACT_APP_API_URL}/contracts/withdraw`, {
                contractId: contract.id,
            }, {
                headers: {
                    'Content-Type': 'application/json',
                },
                timeout: process.env.REACT_APP_HTTP_TIMEOUT,
            });
            onSuccess();
            onClose();
            setError(false);
        } catch (err) {
            setError(true);
        }
    };

    /**
     * Show confirm withdrawal dialog
     */
    const handleWithdraw = () => {
        confirmAlert({
            title: strings.headerConfirm,
            message: strings.textConfirmWithdraw,
            buttons: [
                { label: strings.yes, onClick: () => withdrawProposal() },
                { label: strings.no }],
        });
    };

    /**
     * Render contract details
     *
     * @returns Contract details
     */
    const renderContract = () => (
        <div className="mb-6">
            <dl>
                <dt className="font-light">
                    {strings.labelDataset}
                    :
                </dt>
                <dd className="mb-4">{contract.datasetId}</dd>
                <dt className="font-light">
                    {strings.labelFullName}
                    :
                </dt>
                <dd className="mb-4">{contract.ecko_user.name}</dd>
            </dl>
            <div className="mb-4">
                <img src={logo} alt="ORCID iD logo" height={24} className="align-middle" />
                <a
                    className="text-blue-400 text-sm"
                    target="_blank"
                    rel="noopener noreferrer"
                    href={`${strings.orcidUrl}${contract.ecko_user.orcid}`}
                >
                    &nbsp;
                    {strings.orcidUrl}
                    {contract.ecko_user.orcid}
                </a>
            </div>
            <dl>
                <dt className="font-light">
                    {strings.labelEmail}
                    :
                </dt>
                <dd className="mb-4">{contract.ecko_user.user_email.email}</dd>
                <dt className="font-light">
                    {strings.labelCreated}
                    :
                </dt>
                <dd className="mb-4">{formatDate(contract.created_at)}</dd>
            </dl>
            <LicenseLink license={contract.policy.license} />
            {contract.policy.terms && (
                <>
                    <p className="font-light">
                        {strings.labelTerms}
                        :
                    </p>
                    <p>{contract.policy.terms}</p>
                </>
            )}
            {contract.proposal && (
                <>
                    <p className="mb-2 mt-6 font-light">
                        {strings.infoProposal}
                        :
                    </p>
                    <p className="font-semibold mb-4">{contract.proposal}</p>
                </>
            )}
            {contract.status === 'REJECTED' && contract.response && (
                <>
                    <p className="mb-2 mt-6 font-light">
                        {strings.headerResponse}
                        :
                    </p>
                    <p className="font-semibold mb-4">{contract.response}</p>
                </>
            )}
        </div>
    );

    /**
     * Render response message input
     *
     * @returns Text input or text
     */
    const renderInput = () => {
        if (contract && contract.policy.license) {
            return <p className="mb-6">{contract.policy.license && strings.licensedContract}</p>;
        }
        return (
            <TextField
                id="response"
                name="response"
                type="response"
                label={strings.labelResponse}
                multiline
                rows={6}
                variant="outlined"
                fullWidth
                value={response}
                onChange={(e) => setResponse(e.target.value)}
                inputProps={{ maxLength: 560 }}
            />
        );
    };

    /**
     * Render action buttons
     *
     * @returns Dialog actions
     */
    const renderActions = () => {
        if (type === 1) {
            return (
                <DialogActions>
                    <Button
                        variant="contained"
                        color="secondary"
                        size="large"
                        type="button"
                        onClick={() => handleWithdraw()}
                    >
                        {strings.buttonWithdraw}
                    </Button>
                </DialogActions>
            );
        }
        if (contract.status !== 'PENDING' || contract.policy.license) return null;
        return (
            <DialogActions>
                <Button
                    variant="contained"
                    color="primary"
                    size="large"
                    type="button"
                    onClick={() => handleResolve(true)}
                >
                    {strings.accept}
                </Button>
                <span className="ml-4">
                    <Button
                        variant="contained"
                        color="secondary"
                        size="large"
                        type="button"
                        onClick={() => handleResolve(false)}
                    >
                        {strings.reject}
                    </Button>
                </span>
            </DialogActions>
        );
    };

    return (
        <Dialog
            fullWidth
            scroll="paper"
            open={open}
            onClose={() => { setError(false); onClose(); }}
        >
            <form className="font-sans p-2" autoComplete="off">
                <DialogTitle>
                    {strings.labelContract}
                    {contract ? ` (${contract.status.toLowerCase()})` : ''}
                </DialogTitle>
                <DialogContent>
                    <span className="absolute top-1 right-4">
                        <IconButton
                            edge="end"
                            aria-label="close"
                            onClick={() => { setError(false); onClose(); }}
                        >
                            <Close />
                        </IconButton>
                    </span>
                    {contract && contract.ecko_user && (
                        <>
                            {renderContract()}
                            {contract.status === 'PENDING' && type !== 1 && renderInput()}
                            {contract.status === 'PENDING' && contract.policy.terms && type !== 1 && <p className="mb-6">{strings.infoReject}</p>}
                        </>
                    )}
                    {error && <p className="error text-red-600 mb-8">{strings.errorTryAgain}</p>}
                </DialogContent>
                {contract && renderActions()}
            </form>
            <ProgressIndicator open={resolve !== undefined} />
        </Dialog>
    );
};

export default Contract;
