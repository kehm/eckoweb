import React, { useState } from 'react';
import Info from '@material-ui/icons/Info';
import Popover from '@material-ui/core/Popover';
import IconButton from '@material-ui/core/IconButton';

/**
 * Popover for input info text
 */
const InfoPopover = ({ content }) => {
    const [open, setOpen] = useState(null);

    return (
        <span className="align-middle">
            <IconButton
                edge="end"
                aria-label="info"
                title="Click for more info"
                onClick={(e) => setOpen(e.currentTarget)}
            >
                <Info color="primary" />
            </IconButton>
            <Popover
                className="mt-2"
                id="info-popover"
                open={Boolean(open)}
                anchorEl={open}
                onClose={() => setOpen(null)}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
            >
                {content
                    ? <div className="max-w-sm leading-normal p-5 font-sans text-left" dangerouslySetInnerHTML={{ __html: content }} />
                    : <div className="p-5 text-left" />}
            </Popover>
        </span>
    );
};

export default InfoPopover;
