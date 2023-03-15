import React, { useContext, useEffect, useState } from 'react';
import TextField from '@material-ui/core/TextField';
import strings from '../../strings';
import LoginContext from '../../context/LoginContext';
import FormContext from '../../context/FormContext';
import logo from '../../images/ORCIDiD_iconvector.svg';
import BackButton from '../components/buttons/BackButton';
import EditableList from '../components/lists/EditableList';
import NextButton from '../components/buttons/NextButton';
import createFormHeader from '../../utils/create-form-header';

/**
 * Show form for contact information
 */
const ContactForm = ({ onPrev, onNext, edit }) => {
    const { login } = useContext(LoginContext);
    const { form } = useContext(FormContext);
    const defaults = form;
    const defaultFormValues = {
        contributorName: '',
        contributors: defaults.contributors || [],
    };
    const [formValues, setFormValues] = useState(defaultFormValues);

    useEffect(() => {
        if (formValues.contributors.length === 0) {
            const contributors = [...formValues.contributors];
            contributors.push(login.name);
            setFormValues({ ...formValues, contributors });
        }
    }, [formValues.contributors]);

    /**
     * Handle form submission
     *
     * @param {Object} e Event
     */
    const handleSubmit = (e) => {
        e.preventDefault();
        Object.assign(form, { contributors: formValues.contributors });
        onNext(form);
    };

    /**
     * Add new contributor to contributor array
     */
    const addNewContributor = () => {
        const arr = [...formValues.contributors];
        if (formValues.contributorName !== '') {
            arr.push(formValues.contributorName);
            setFormValues({ contributorName: '', contributors: arr });
        }
    };

    /**
     * Render inputs for contact info
     *
     * @returns Contact info
     */
    const renderContactInputs = () => (
        <div className="my-10">
            <h3 className="font-semibold text-sm mb-6">
                {strings.labelContact}
                :
            </h3>
            <TextField
                required
                disabled
                id="contactName"
                name="contactName"
                type="text"
                label={strings.labelFullName}
                variant="outlined"
                fullWidth
                value={login.name || ''}
                InputLabelProps={{ shrink: true }}
            />
            <TextField
                required
                disabled
                id="contactEmail"
                name="contactEmail"
                type="email"
                label={strings.labelEmail}
                variant="outlined"
                fullWidth
                value={login.email || ''}
                InputLabelProps={{ shrink: true }}
            />
            <img src={logo} alt="ORCID iD logo" height={24} className="align-middle" />
            <a
                className="text-blue-400 text-sm"
                target="_blank"
                rel="noopener noreferrer"
                href={`${strings.orcidUrl}${login.orcid}`}
            >
                {` ${strings.orcidUrl}${login.orcid}`}
            </a>
        </div>
    );

    return (
        <form autoComplete="off" onSubmit={handleSubmit}>
            <h1 className="font-light text-2xl">
                {createFormHeader(strings.headerContactInfo, 5)}
            </h1>
            <p className="mt-6 mb-8">{strings.infoMainContact}</p>
            {renderContactInputs()}
            {!edit && (
                <EditableList
                    name="contributorName"
                    preserveItem={login.name}
                    label={strings.labelFullName}
                    headerLabel={strings.labelContributors}
                    info={strings.infoContributors}
                    value={formValues.contributorName}
                    options={formValues.contributors}
                    onAdd={() => addNewContributor()}
                    onChange={(contributorName) => setFormValues({
                        ...formValues,
                        contributorName,
                    })}
                    onChangeArr={(contributors) => setFormValues({ ...formValues, contributors, contributorName: '' })}
                    editableOrder
                />
            )}
            <NextButton />
            <BackButton onClick={onPrev} />
        </form>
    );
};

export default ContactForm;
