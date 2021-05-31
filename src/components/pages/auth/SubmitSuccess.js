import React from 'react';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import HomeOutlined from '@material-ui/icons/HomeOutlined';
import strings from '../../../strings';

/**
 * Render submission successful confirmation
 */
const SubmitSuccess = ({ onNav, edit }) => (
    <>
        <div className="mb-8">
            <h1 className="pb-2">{strings.titleSuccess}</h1>
            <p className="py-4">{edit ? strings.editSuccess : strings.submitSuccess}</p>
            <p>{strings.eckoTeam}</p>
        </div>
        <Button
            variant="contained"
            color="primary"
            size="large"
            type="button"
            endIcon={<HomeOutlined />}
            component={Link}
            to="/"
            onClick={() => onNav()}
        >
            {strings.buttonHome}
        </Button>
    </>
);

export default SubmitSuccess;
