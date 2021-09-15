import React, { useEffect, useState } from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import Dialog from '@material-ui/core/Dialog';
import Close from '@material-ui/icons/Close';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import LibraryBooksOutlined from '@material-ui/icons/LibraryBooksOutlined';
import strings from '../../strings';
import useFetch from '../../hooks/useFetch';
import formatDate from '../../utils/format-date';
import AssignRole from './AssignRole';

/**
 * Organization admin dialog
 */
const Admin = ({ open, onClose }) => {
    const roles = useFetch(`${process.env.REACT_APP_API_URL}/db/roles`);
    const unassigned = useFetch(`${process.env.REACT_APP_API_URL}/affiliations/none`);
    const assigned = useFetch(`${process.env.REACT_APP_API_URL}/affiliations/assigned`);
    const [requests, setRequests] = useState([]);
    const [openDialog, setOpenDialog] = useState(undefined);
    const [tab, setTab] = useState(0);

    /**
     * Set request list
     */
    useEffect(() => {
        if (tab === 1) {
            setRequests(assigned);
        } else setRequests(unassigned);
    }, [tab, unassigned, assigned]);
    return (
        <Dialog fullWidth scroll="paper" open={open} onClose={() => onClose()}>
            <div className="font-sans p-2">
                <DialogTitle>{strings.headerUsers}</DialogTitle>
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
                    <p className="mb-6">{strings.noAffiliations}</p>
                    <AppBar className="mb-6" position="relative" color="transparent">
                        <Tabs
                            value={tab}
                            onChange={(e, val) => setTab(val)}
                            aria-label="about tabs"
                            TabIndicatorProps={{ style: { opacity: 0 } }}
                        >
                            <Tab label={strings.labelUnassigned} />
                            <Tab label={strings.labelAssigned} />
                        </Tabs>
                    </AppBar>
                    {requests.length > 0 ? (
                        <List>
                            {requests.map((request) => (
                                <ListItem key={request.requestId} className="mt-2">
                                    <ListItemText
                                        primary={request.name}
                                        secondary={request.createdat
                                            && `${request.role.charAt(0)}${request.role.substring(1).toLowerCase().replace(/_/g, ' ')} (${formatDate(request.createdat)})`}
                                    />
                                    <ListItemSecondaryAction
                                        onClick={() => setOpenDialog(request)}
                                    >
                                        <IconButton edge="end" aria-label="more">
                                            <LibraryBooksOutlined />
                                        </IconButton>
                                    </ListItemSecondaryAction>
                                </ListItem>
                            ))}
                        </List>
                    ) : (
                        <p className="text-center mb-6">
                            {tab === 0 ? strings.noUnassigned : strings.noAssigned}
                        </p>
                    )}
                </DialogContent>
            </div>
            {openDialog && (
                <AssignRole
                    open={openDialog !== undefined}
                    affiliation={openDialog}
                    roles={roles}
                    onClose={() => setOpenDialog(undefined)}
                    onSuccess={() => { setOpenDialog(undefined); onClose(); }}
                />
            )}
        </Dialog>
    );
};

export default Admin;
