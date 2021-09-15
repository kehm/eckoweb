import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import strings from '../../strings';

/**
 * Render confirm action dialog
 */
const ConfirmAction = ({ openContent, onClose, onConfirm }) => (
    <Dialog
        className="font-sans text-center"
        onClose={() => onClose()}
        open={openContent || false}
    >
        <DialogTitle>{strings.pleaseConfirm}</DialogTitle>
        <DialogContent>
            <p className="pb-4">{openContent}</p>
        </DialogContent>
        <DialogActions>
            <div className="flex m-auto pb-6 px-4">
                <span className="mr-4">
                    <Button
                        variant="contained"
                        color="primary"
                        size="medium"
                        type="button"
                        onClick={() => { onClose(); onConfirm(); }}
                    >
                        {strings.buttonConfirm}
                    </Button>
                </span>
                <Button
                    variant="contained"
                    color="default"
                    size="medium"
                    type="button"
                    onClick={() => onClose()}
                >
                    {strings.buttonCancel}
                </Button>
            </div>
        </DialogActions>
    </Dialog>
);

export default ConfirmAction;
