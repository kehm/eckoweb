import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import InfoForm from '../../forms/InfoForm';
import ContactForm from '../../forms/ContactForm';
import PolicyForm from '../../forms/PolicyForm';
import GeoForm from '../../forms/GeoForm';
import MetaForm from '../../forms/MetaForm';
import FormContext from '../../../context/FormContext';
import SamplingForm from '../../forms/SamplingForm';
import SubmitSuccess from './SubmitSuccess';
import createFormData from '../../../utils/create-form-data';
import ProgressIndicator from '../../components/ProgressIndicator';
import useFetch from '../../../hooks/useFetch';
import LoginContext from '../../../context/LoginContext';
import strings from '../../../strings';
import Register from '../../auth/Register';

/**
 * Show form for submitting or editing a dataset
 */
const Submit = ({ onNav, edit }) => {
    const { login } = useContext(LoginContext);
    const history = useHistory();
    const { id } = useParams();
    const formState = { form: {} };
    const [form, setForm] = useState(formState);
    const formValue = { form, setForm };
    const [formSelect, setFormSelect] = useState(0);
    const datasets = useFetch(`${process.env.REACT_APP_API_URL}/datasets/metadata`);
    const licenses = useFetch(`${process.env.REACT_APP_API_URL}/db/licenses`);
    const [datasetOptions, setDatasetOptions] = useState(undefined);
    const [original, setOriginal] = useState(undefined);
    const [error, setError] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [registering, setRegistering] = useState(false);

    /**
    * Store form data and current page in local storage
    */
    useEffect(() => {
        window.scrollTo(0, 0);
        history.push(`?step=${formSelect}`);
    }, [form, formSelect]);

    /**
    * Set dataset options for select dropdown and set existing dataset
    */
    useEffect(() => {
        if (datasetOptions === undefined && datasets.length > 0) {
            setDatasetOptions(datasets.map((dataset) => {
                const option = {
                    label: dataset.id,
                    value: dataset.id,
                };
                return option;
            }));
        }
        if (edit && id && datasets.length > 0) {
            const dataset = datasets.find((element) => element.id === id);
            if (dataset) {
                setForm(Object.assign(
                    dataset.metadata,
                    dataset.policy,
                    { restrictionType: dataset.policy.license ? 'LICENSE' : 'RESTRICT' },
                    { geoReference: JSON.parse(dataset.geoReference) },
                ));
            }
        } else setForm({});
    }, [id, datasets, datasetOptions, edit]);

    /**
     * Submit the complete form data to the REST API
     *
     * @param {Object} data Form data
     */
    const submitToAPI = async (data) => {
        try {
            if (edit) {
                await axios.put(`${process.env.REACT_APP_API_URL}/datasets/${id}`, createFormData(data), {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                    timeout: process.env.REACT_APP_HTTP_TIMEOUT,
                });
            } else {
                await axios.post(`${process.env.REACT_APP_API_URL}/datasets`, createFormData(data), {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                    timeout: process.env.REACT_APP_HTTP_TIMEOUT,
                });
            }
            setFormSelect(formSelect + 1);
        } catch (err) {
            setError(true);
        }
        setSubmitting(false);
    };

    /**
     * If submit success go to success page
     */
    useEffect(() => {
        if (submitting) submitToAPI(submitting);
    }, [submitting]);

    /**
     * Handle form submits and store form data in object
     *
     * @param {Object} data Form data
     */
    const handleSubmit = (data) => {
        const tmp = { ...form };
        Object.assign(tmp, data);
        setForm(tmp);
        setFormSelect(formSelect + 1);
    };

    /**
     * Find original dataset
     *
     * @param {string} originalId Original dataset ID
     */
    const handleGetOriginal = async (originalId) => {
        if (originalId) {
            const dataset = datasets.find((element) => element.id === originalId);
            if (dataset) setOriginal(dataset);
        } else setOriginal(undefined);
    };

    /**
     * Render invalid permissions info
     *
     * @returns Info
     */
    const renderInvalidPermissions = () => (
        <div className="text-center">
            <p>{strings.noRole}</p>
            <p>
                {strings.goTo}
                <Link
                    to="/profile"
                    className="text-blue-400"
                    onClick={() => onNav()}
                >
                    &nbsp;
                    {strings.profilePage}
                    &nbsp;
                </Link>
                {strings.toCheckProfile}
            </p>
        </div>
    );

    /**
     * Render submission page
     *
     * @returns Form page
     */
    const renderPage = () => {
        if (!login.role || registering) {
            return <Register onRegister={() => setRegistering(true)} />;
        }
        if (login.role === 'ADMIN' || login.role === 'MEMBER' || login.role === 'EXTERNAL') {
            return (
                (formSelect === 0 && (
                    <InfoForm
                        onNext={(data) => handleSubmit(data)}
                        datasets={datasetOptions}
                        onResurvey={(originalId) => handleGetOriginal(originalId)}
                        edit={edit}
                    />
                ))
                || (formSelect === 1 && (
                    <SamplingForm
                        onNext={(data) => handleSubmit(data)}
                        onPrev={() => setFormSelect(formSelect - 1)}
                    />
                ))
                || (formSelect === 2 && (
                    <GeoForm
                        onNext={(data) => handleSubmit(data)}
                        onPrev={() => setFormSelect(formSelect - 1)}
                        original={original}
                    />
                ))
                || (formSelect === 3 && (
                    <MetaForm
                        onNext={(data) => handleSubmit(data)}
                        onPrev={() => setFormSelect(formSelect - 1)}
                    />
                ))
                || (formSelect === 4 && (
                    <ContactForm
                        onNext={(data) => handleSubmit(data)}
                        onPrev={() => setFormSelect(formSelect - 1)}
                    />
                ))
                || (formSelect === 5 && (
                    <PolicyForm
                        licenses={licenses}
                        onNext={(data) => setSubmitting(data)}
                        onPrev={() => setFormSelect(formSelect - 1)}
                        errorSubmission={error}
                        edit={edit}
                    />
                ))
                || (formSelect === 6 && (
                    <SubmitSuccess
                        onNav={() => onNav()}
                        edit={edit}
                    />
                ))
            );
        }
        return renderInvalidPermissions();
    };

    return (
        <FormContext.Provider value={formValue}>
            <div className="pb-24 pt-4 sm:pt-24 px-7 max-w-lg relative m-auto xl:ml-96 leading-normal">
                {renderPage()}
                <ProgressIndicator open={submitting} />
            </div>
        </FormContext.Provider>
    );
};

export default Submit;
