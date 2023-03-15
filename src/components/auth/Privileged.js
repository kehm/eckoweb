import React from 'react';
import Button from '@material-ui/core/Button';
import HomeOutlined from '@material-ui/icons/HomeOutlined';
import { Link } from 'react-router-dom';
import strings from '../../strings';

/**
 * Render invalid privileges info
 */
const Privileged = () => (
    <div className="px-4 py-12 m-auto max-w-lg relative">
        <h1 className="pb-2">{strings.invalidRole}</h1>
        <p className="mb-8">{strings.roleRequired}</p>
        <Button
            variant="contained"
            color="primary"
            size="large"
            type="button"
            endIcon={<HomeOutlined />}
            component={Link}
            to="/"
        >
            {strings.buttonHome}
        </Button>
    </div>
);

export default Privileged;
