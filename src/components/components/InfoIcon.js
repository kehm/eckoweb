import React from 'react';
import InputAdornment from '@material-ui/core/InputAdornment';
import InfoPopover from './InfoPopover';

/**
 * Render info icon
 */
const InfoIcon = ({ info }) => (
    <InputAdornment
        className="absolute -left-11 sm:-left-16 top-3"
        position="end"
    >
        <InfoPopover content={info} />
    </InputAdornment>
);

export default InfoIcon;
