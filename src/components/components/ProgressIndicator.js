import React from 'react';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';
import strings from '../../strings';

const useStyles = makeStyles((theme) => ({
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#F59E0B',
    },
}));

/**
 * Render progress indicator
 */
const ProgressIndicator = ({ open }) => {
    const classes = useStyles();

    return (
        <Backdrop open={open} className={classes.backdrop}>
            <div>
                <CircularProgress color="inherit" size={50} />
            </div>
            <p className="font-sans ml-4 text-center">{strings.connectBlockchain}</p>
        </Backdrop>
    );
};

export default ProgressIndicator;
