import React from 'react';
import NavigateNext from '@material-ui/icons/NavigateNext';
import Button from '@material-ui/core/Button';
import strings from '../../../strings';

/**
 * Render next button
 */
const NextButton = () => (
    <div className="absolute right-10">
        <Button
            variant="contained"
            color="primary"
            size="large"
            type="submit"
            startIcon={<NavigateNext />}
        >
            {strings.next}
        </Button>
    </div>
);

export default NextButton;
