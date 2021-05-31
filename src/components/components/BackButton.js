import React from 'react';
import NavigateBefore from '@material-ui/icons/NavigateBefore';
import Button from '@material-ui/core/Button';
import strings from '../../strings';

/**
 * Render back button
 */
const BackButton = ({ onClick }) => (
    <Button
        variant="text"
        color="secondary"
        startIcon={<NavigateBefore />}
        size="large"
        type="button"
        onClick={() => onClick()}
    >
        {strings.goBack}
    </Button>
);

export default BackButton;
