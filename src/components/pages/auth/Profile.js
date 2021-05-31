import React, { useContext, useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router';
import Button from '@material-ui/core/Button';
import LocationCity from '@material-ui/icons/LocationCity';
import GroupAdd from '@material-ui/icons/GroupAdd';
import EditOutlined from '@material-ui/icons/EditOutlined';
import IconButton from '@material-ui/core/IconButton';
import strings from '../../../strings';
import LoginContext from '../../../context/LoginContext';
import logo from '../../../images/ORCIDiD_iconvector.svg';
import InfoPopover from '../../components/InfoPopover';
import useFetch from '../../../hooks/useFetch';
import AddAffiliation from '../../dialogs/AddAffiliation';
import createProfile from '../../../utils/create-profile';
import Admin from '../../dialogs/Admin';
import ChangeEmail from '../../dialogs/ChangeEmail';

/**
 * User profile page
 */
const Profile = ({ triggerFeedback }) => {
    const { login, setLogin } = useContext(LoginContext);
    const history = useHistory();
    const organization = login.organization
        ? useFetch(`${process.env.REACT_APP_API_URL}/db/organizations/${login.organization}`)
        : undefined;
    const [openDialog, setOpenDialog] = useState(false);
    const [openAdmin, setOpenAdmin] = useState(false);
    const [openChangeEmail, setOpenChangeEmail] = useState(false);

    /**
     * Sign the user out
     */
    const handleChangeAffiliation = async () => {
        try {
            await axios.post(`${process.env.REACT_APP_API_URL}/auth/invalidate`,
                {},
                { timeout: process.env.REACT_APP_HTTP_TIMEOUT });
            setLogin(createProfile(false));
            history.replace('/');
        } catch (err) { }
    };

    /**
     * Render profile info
     *
     * @returns Profile info
     */
    const renderProfileInfo = () => (
        <>
            <a className="text-blue-400" target="_blank" rel="noopener noreferrer" href={`${strings.orcidUrl}${login.orcid}`}>
                <img src={logo} alt="ORCID iD logo" height={24} className="align-middle ml-3" />
                &nbsp;
                {strings.orcidUrl}
                {login.orcid}
            </a>
            <ul className="list-none my-6 ml-1">
                <li className="relative mb-4">
                    {login.name}
                </li>
                <li className="relative mb-4">
                    <span className="absolute -top-3 -left-11">
                        <IconButton edge="end" aria-label="email" onClick={() => setOpenChangeEmail(true)}>
                            <EditOutlined />
                        </IconButton>
                    </span>
                    {login.email}
                </li>
                <li className="relative mb-4">
                    {login.role === 'ADMIN' && (
                        <span className="absolute -top-3 -left-11">
                            <IconButton edge="end" aria-label="admin" onClick={() => setOpenAdmin(true)}>
                                <GroupAdd />
                            </IconButton>
                        </span>
                    )}
                    {organization ? organization.name : strings.unaffiliated}
                </li>
                <li className="relative mb-4">
                    {organization && login.role
                        ? `${strings.labelRole}: ${login.role.toLowerCase().replace(/_/g, ' ')}`
                        : ''}
                </li>
            </ul>
        </>
    );

    return (
        <div className="pb-24 pt-4 sm:pt-24 px-7 max-w-lg relative m-auto xl:ml-96 leading-normal">
            <p>
                <InfoPopover content={strings.orcidInfo} placement="right-start" />
                    &nbsp;
                    {strings.orcidDetails}
            </p>
            {renderProfileInfo()}
            <div className="absolute bottom-0 right-10">
                <span className="mr-4">
                    <Button
                        variant="contained"
                        color="primary"
                        size="small"
                        type="button"
                        endIcon={<LocationCity />}
                        onClick={() => setOpenDialog(true)}
                    >
                        {strings.changeAffiliation}
                    </Button>
                </span>
                <Button
                    variant="text"
                    color="secondary"
                    size="medium"
                    type="button"
                    onClick={() => triggerFeedback()}
                >
                    {strings.buttonDeleteProfile}
                </Button>
            </div>
            <AddAffiliation
                open={openDialog}
                organizationId={login.organization}
                onClose={() => setOpenDialog(false)}
                onSuccess={() => handleChangeAffiliation()}
            />
            {openAdmin && (
                <Admin
                    open={openAdmin}
                    onClose={() => setOpenAdmin(false)}
                />
            )}
            {openChangeEmail && (
                <ChangeEmail open={openChangeEmail} onClose={() => setOpenChangeEmail(false)} />
            )}
        </div>
    );
};

export default Profile;
