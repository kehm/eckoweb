import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/icons/Menu';
import LoginContext from '../../context/LoginContext';
import strings from '../../strings';

/**
 * Render mobile nav drawer
 */
const MobileDrawer = ({ selected, onSelect, onClickSignOut }) => {
    const { login } = useContext(LoginContext);
    const [open, setOpen] = useState(false);

    /**
     * Render list of navigation links
     *
     * @returns List of links
     */
    const renderList = () => (
        <>
            <List className="font-sans">
                <div>
                    <ListItem button component={Link} to="/" onClick={() => { onSelect(0); setOpen(false); }}>
                        <span className={`link-drawer text-sm pl-2 ${selected === 0 ? 'text-yellow-500' : 'text-darkGrey'}`}>
                            {strings.navHome}
                        </span>
                    </ListItem>
                </div>
                <ListItem button component={Link} to="/about/about" onClick={() => { onSelect(1); setOpen(false); }}>
                    <span className={`link-drawer text-sm pl-2 ${selected === 1 ? 'text-yellow-500' : 'text-darkGrey'}`}>
                        {strings.navAbout}
                    </span>
                </ListItem>
                <ListItem button component={Link} to="/about/whatis" onClick={() => { onSelect(1); setOpen(false); }}>
                    <span className="link-drawer text-xs pl-2 ml-2 text-darkGrey">
                        -
                        &nbsp;
                        {strings.navWhatIs}
                    </span>
                </ListItem>
                <ListItem button component={Link} to="/about/team" onClick={() => { onSelect(1); setOpen(false); }}>
                    <span className="link-drawer text-xs pl-2 ml-2 text-darkGrey">
                        -
                        &nbsp;
                        {strings.navTeam}
                    </span>
                </ListItem>
                <ListItem button component={Link} to="/datasets" onClick={() => { onSelect(2); setOpen(false); }}>
                    <span className={`link-drawer text-sm pl-2 ${selected === 2 ? 'text-yellow-500' : 'text-darkGrey'}`}>
                        {strings.navDatasets}
                    </span>
                </ListItem>
            </List>
            <Divider />
            <List className="font-sans">
                <ListItem button component={Link} to="/submit" onClick={() => { onSelect(3); setOpen(false); }}>
                    <span className={`link-drawer text-sm pl-2 ${selected === 3 ? 'text-yellow-500' : 'text-darkGrey'}`}>
                        {login.authenticated ? strings.navSubmit : strings.navContribute}
                    </span>
                </ListItem>
                {login.authenticated && (
                    <>
                        <ListItem button component={Link} to="/contributions" onClick={() => { onSelect(5); setOpen(false); }}>
                            <span className={`link-drawer text-sm pl-2 ${selected === 5 ? 'text-yellow-500' : 'text-darkGrey'}`}>
                                {strings.navContributions}
                            </span>
                        </ListItem>
                        <ListItem button component={Link} to="/contracts" onClick={() => { onSelect(4); setOpen(false); }}>
                            <span className={`link-drawer text-sm pl-2 ${selected === 4 ? 'text-yellow-500' : 'text-darkGrey'}`}>
                                {strings.navContracts}
                            </span>
                        </ListItem>
                        <ListItem button component={Link} to="/profile" onClick={() => { onSelect(6); setOpen(false); }}>
                            <span className={`link-drawer text-sm pl-2 ${selected === 6 ? 'text-yellow-500' : 'text-darkGrey'}`}>
                                {strings.navProfile}
                            </span>
                        </ListItem>
                        <ListItem button component={Link} to="/" onClick={() => onClickSignOut()}>
                            <span className="link-drawer text-sm pl-2 mt-10">
                                {strings.signOut}
                            </span>
                        </ListItem>
                    </>
                )}
            </List>
        </>
    );

    return (
        <div className="sm:hidden">
            <IconButton edge="start" aria-label="open" onClick={() => setOpen(true)}>
                <Menu fontSize="large" />
            </IconButton>
            <Drawer
                anchor="left"
                open={open}
                onClose={() => setOpen(false)}
            >
                {renderList()}
            </Drawer>
        </div>
    );
};

export default MobileDrawer;
