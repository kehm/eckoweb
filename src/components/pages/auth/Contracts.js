import React, { useEffect, useState } from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import LibraryBooksOutlined from '@material-ui/icons/LibraryBooksOutlined';
import useFetch from '../../../hooks/useFetch';
import strings from '../../../strings';
import formatDate from '../../../utils/format-date';
import ProgressIndicator from '../../components/ProgressIndicator';
import Contract from '../../dialogs/Contract';

/**
 * Render list of contracts and pending requests
 */
const Contracts = () => {
    const contracts = useFetch(`${process.env.REACT_APP_API_URL}/contracts/resolved/this`);
    const pendingIn = useFetch(`${process.env.REACT_APP_API_URL}/contracts/pending/this`);
    const pendingOut = useFetch(`${process.env.REACT_APP_API_URL}/contracts/pending/user`);
    const [openDialog, setOpenDialog] = useState({ contract: undefined, type: undefined });
    const [showProgress, setShowProgress] = useState(2);
    const [tab, setTab] = useState(0);
    const [success, setSuccess] = useState(false);

    /**
     * Hide progress indicator after fetching data from API
     */
    useEffect(() => {
        setShowProgress(showProgress - 1);
    }, [contracts]);

    /**
     * Render lists
     *
     * @returns List
     */
    const renderList = () => {
        let list = pendingIn;
        if (tab === 1) {
            list = pendingOut;
        } else if (tab === 2) {
            list = contracts;
        }
        if (list.length === 0) {
            let info = strings.noPendingIn;
            if (tab === 1) {
                info = strings.noPendingOut;
            } else if (tab === 2) {
                info = strings.noContracts;
            }
            return <p className="text-center mb-6">{info}</p>;
        }
        return (
            <List>
                {list.length > 0 && list.map((contract, index) => (
                    <ListItem key={index} className="mt-2">
                        <ListItemText
                            primary={contract.ecko_user ? `${contract.ecko_user.name} (${contract.status.toLowerCase()})` : strings.unknown}
                            secondary={contract.created_at && `${contract.datasetId} (${formatDate(contract.created_at)})`}
                        />
                        <ListItemSecondaryAction
                            onClick={() => setOpenDialog({ contract, type: tab })}
                        >
                            <IconButton edge="end" aria-label="more">
                                <LibraryBooksOutlined />
                            </IconButton>
                        </ListItemSecondaryAction>
                    </ListItem>
                ))}
            </List>
        );
    };

    return (
        <>
            <div className="pb-24 pt-4 sm:pt-24 px-7 max-w-lg relative m-auto xl:ml-96 leading-normal">
                <p className="mb-6">{strings.infoDataRequests}</p>
                <AppBar className="mb-6" position="relative" color="transparent">
                    <Tabs
                        value={tab}
                        onChange={(e, val) => setTab(val)}
                        aria-label="contract tabs"
                        TabIndicatorProps={{ style: { opacity: 0 } }}
                    >
                        <Tab label={strings.pendingIn} />
                        <Tab label={strings.pendingOut} />
                        <Tab label={strings.navContracts} />
                    </Tabs>
                </AppBar>
                {success
                    ? <p className="text-center mb-6">{strings.resolveSuccess}</p>
                    : renderList()}
            </div>
            <Contract
                open={openDialog.contract !== undefined}
                contract={openDialog.contract}
                type={openDialog.type}
                onClose={() => setOpenDialog({ contract: undefined, type: undefined })}
                onSuccess={() => setSuccess(true)}
            />
            <ProgressIndicator open={showProgress !== 0} />
        </>
    );
};

export default Contracts;
