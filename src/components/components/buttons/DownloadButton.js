import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import GetAppOutlined from '@material-ui/icons/GetAppOutlined';
import SpeakerNotesOutlined from '@material-ui/icons/SpeakerNotesOutlined';
import strings from '../../../strings';
import LoginContext from '../../../context/LoginContext';

/**
 * Render download button
 */
const DownloadButton = ({
    dataset, contract, onNav, onDownload,
}) => {
    const { login } = useContext(LoginContext);

    /**
     * Render contract info
     *
     * @returns Contract info
     */
    const renderContractInfo = () => {
        if (dataset.contractStatus === 'ACCEPTED') {
            return <p>{strings.ownerContract}</p>;
        }
        if (contract && contract.datasetId === dataset.id && contract.status === 'ACCEPTED') {
            return <p>{strings.contractExists}</p>;
        }
        if (contract && contract.datasetId === dataset.id && contract.status === 'PENDING') {
            return (
                <p>
                    {strings.notifyEmail}
                    <Link
                        to="/contracts"
                        className="text-blue-400"
                        onClick={() => onNav()}
                    >
                        {strings.contractsPage}
                    </Link>
                    .
                </p>
            );
        }
        return null;
    };

    let request = true;
    if (dataset.contractStatus === 'ACCEPTED' || !dataset.policy.terms) {
        request = false;
    }
    if (contract && contract.datasetId === dataset.id && contract.status === 'ACCEPTED') {
        request = false;
    }
    let disableButton = false;
    if (contract && contract.datasetId === dataset.id && contract.status === 'PENDING') {
        disableButton = true;
    }
    if (!login.authenticated || login.status !== 'VERIFIED') {
        disableButton = true;
    }
    return (
        <div className="pt-8 pb-4">
            {renderContractInfo()}
            {!login.authenticated && (
                <p>
                    {strings.youMust}
                    <Link to="/auth/signin" className="text-blue-400">{strings.signIn}</Link>
                    {strings.signInFirst}
                </p>
            )}
            {login.authenticated && login.status !== 'VERIFIED' && <p>{strings.verifyFirst}</p>}
            <div className="mt-4">
                <Button
                    variant="contained"
                    color="primary"
                    size="large"
                    type="button"
                    endIcon={request ? <SpeakerNotesOutlined /> : <GetAppOutlined />}
                    onClick={() => onDownload()}
                    disabled={disableButton}
                >
                    {request ? strings.headerProposal : strings.buttonDownload}
                </Button>
            </div>
        </div>
    );
};

export default DownloadButton;
