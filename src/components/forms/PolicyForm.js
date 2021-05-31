import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import NoteAddOutlined from '@material-ui/icons/NoteAddOutlined';
import OpenInNewOutlined from '@material-ui/icons/OpenInNewOutlined';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import strings from '../../strings';
import FormContext from '../../context/FormContext';
import InfoIcon from '../components/InfoIcon';
import BackButton from '../components/BackButton';
import createFormHeader from '../../utils/create-form-header';

/**
 * Show form for general information
 */
const PolicyForm = ({
    licenses, onPrev, onNext, errorSubmission, edit,
}) => {
    const { form } = useContext(FormContext);
    const defaults = form;
    const defaultFormValues = {
        license: defaults.license || '',
        terms: defaults.terms || '',
        restrictionType: defaults.restrictionType || '',
    };
    const [formValues, setFormValues] = useState(defaultFormValues);
    const restrictionTypes = [
        { value: 'LICENSE', label: strings.titleLicense },
        { value: 'RESTRICT', label: strings.restrict },
    ];

    /**
     * Show confirmation dialog and submit form on accept
     *
     * @param {Object} formData Form data
     */
    const submitForm = (formData) => {
        confirmAlert({
            title: strings.headerConfirm,
            message: edit ? strings.textConfirmSaveDataset : strings.textConfirmSubmitDataset,
            buttons: [
                {
                    label: strings.yes,
                    onClick: () => onNext(formData),
                },
                { label: strings.no }],
        });
    };

    /**
     * Handle form submission
     *
     * @param {Object} e Event
     */
    const handleSubmit = (e) => {
        e.preventDefault();
        const values = {
            license: formValues.restrictionType === 'LICENSE' ? formValues.license : undefined,
            terms: formValues.restrictionType === 'RESTRICT' ? formValues.terms : undefined,
        };
        Object.assign(form, values);
        submitForm(form);
    };

    /**
     * Render user inputs
     *
     * @returns Inputs
     */
    const renderInputs = () => (
        <div className="h-80 mb-14">
            <FormControl variant="outlined" fullWidth>
                <InputLabel id="restrictionType-label" required>
                    {strings.labelRestrictTypes}
                </InputLabel>
                <Select
                    required
                    className="mb-8"
                    labelId="restrictionType-label"
                    id="restrictionType"
                    value={formValues.restrictionType}
                    variant="outlined"
                    label={strings.labelRestrictTypes}
                    fullWidth
                    onChange={(e) => setFormValues({
                        ...formValues,
                        restrictionType: e.target.value,
                    })}
                    name="restrictionType"
                    endAdornment={<InfoIcon info={strings.infoRestrictTypes} />}
                >
                    {restrictionTypes.map((restrictionType) => (
                        <MenuItem key={restrictionType.value} value={restrictionType.value}>
                            {restrictionType.label}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
            {formValues.restrictionType === 'LICENSE' && (
                <>
                    <FormControl variant="outlined" fullWidth>
                        <InputLabel id="license-label" required>
                            {strings.labelSelectLicense}
                        </InputLabel>
                        <Select
                            required
                            className="mb-8"
                            labelId="license-label"
                            id="license"
                            value={formValues.license}
                            variant="outlined"
                            label={strings.labelSelectLicense}
                            fullWidth
                            onChange={(e) => setFormValues({
                                ...formValues,
                                license: e.target.value,
                            })}
                            name="license"
                            endAdornment={<InfoIcon info={strings.infoLicense} />}
                        >
                            {licenses.map((license) => (
                                <MenuItem key={license.code} value={license.code}>
                                    {license.name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <a
                        className="font-sans cursor-pointer text-sm text-blue-400"
                        target="_blank"
                        rel="noopener noreferrer"
                        href={strings.urlCc}
                        title={strings.urlCc}
                    >
                        <OpenInNewOutlined className="align-bottom" />
                        &nbsp;
                        {strings.aboutLicenses}
                    </a>
                </>
            )}
            {formValues.restrictionType === 'RESTRICT' && (
                <>
                    <TextField
                        required
                        id="terms"
                        name="terms"
                        type="text"
                        label={strings.labelTerms}
                        multiline
                        rows={6}
                        variant="outlined"
                        fullWidth
                        value={formValues.terms}
                        onChange={(e) => setFormValues({
                            ...formValues,
                            terms: e.target.value,
                        })}
                        InputProps={{ endAdornment: <InfoIcon info={strings.infoRestriction} /> }}
                        inputProps={{ maxLength: 560 }}
                    />
                    <p>{strings.emailApprove}</p>
                </>
            )}
        </div>
    );

    return (
        <form autoComplete="off" onSubmit={handleSubmit}>
            <h1 className="font-light text-2xl">
                {createFormHeader(strings.titlePolicy, 6)}
            </h1>
            <p className="mt-6 mb-10">{strings.infoPolicy}</p>
            {renderInputs()}
            <p className="mb-6">
                {strings.readOur}
                <Link target="_blank" rel="noopener noreferrer" className="text-blue-400" to="/about/privacy"> {strings.privacyPolicy} </Link>
                {strings.textBeforeUpload}
                {strings.byClickingSubmit}
            </p>
            {errorSubmission && <p className="error my-4 text-red-600">{strings.errorSubmission}</p>}
            <div className="absolute right-10">
                <Button
                    variant="contained"
                    color="primary"
                    endIcon={<NoteAddOutlined />}
                    size="large"
                    type="submit"
                    disabled={!formValues.restrictionType}
                >
                    {edit ? strings.buttonSave : strings.submit}
                </Button>
            </div>
            <BackButton onClick={onPrev} />
        </form>
    );
};

export default PolicyForm;
