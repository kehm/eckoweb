import React, { useState, useContext, useEffect } from 'react';
import { useHistory } from 'react-router';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import InfoIcon from '../components/InfoIcon';
import FileDrop from '../components/FileDrop';
import EditableList from '../components/lists/EditableList';
import strings from '../../strings';
import languages from '../../languages';
import FormContext from '../../context/FormContext';
import NextButton from '../components/buttons/NextButton';
import InfoPopover from '../components/InfoPopover';
import createFormHeader from '../../utils/create-form-header';
import ProgressIndicator from '../components/ProgressIndicator';
import { removeDatasetFile } from '../../utils/api/datasets';
import ConfirmAction from '../dialogs/ConfirmAction';

/**
 * Show form for general information
 */
const InfoForm = ({
    onNext, datasets, onResurvey, edit,
}) => {
    const history = useHistory();
    const { form } = useContext(FormContext);
    const defaults = form;
    const defaultFormValues = {
        collectionId: defaults.collectionId || '',
        datasetFile: defaults.datasetFile || [],
        description: defaults.description || '',
        image: defaults.image || [],
        languages: defaults.languages || [],
        parentEventId: defaults.parentEventId || '',
        references: defaults.references || [],
        survey: defaults.survey || '',
        referenceName: '',
    };
    const [formValues, setFormValues] = useState(defaultFormValues);
    const [error, setError] = useState(undefined);
    const [errorRemove, setErrorRemove] = useState(false);
    const [showProgress, setShowProgress] = useState(false);
    const [openConfirm, setOpenConfirm] = useState(undefined);
    const surveys = [
        { value: 'ORIGINAL', label: strings.original },
        { value: 'RESURVEY', label: strings.resurvey },
        { value: 'COMBINATION', label: strings.combination },
    ];
    const fileTypes = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel, application/vnd.oasis.opendocument.spreadsheet, text/csv';
    const imageFileTypes = 'image/jpeg, image/png';

    /**
     * Update inputs with default values from existing dataset
     */
    useEffect(() => {
        setFormValues({
            ...formValues,
            collectionId: form.collectionId || '',
            datasetFile: form.datasetFile || [],
            description: form.description || '',
            image: form.image || [],
            languages: form.languages || [],
            parentEventId: form.parentEventId || '',
            references: form.references || [],
            survey: form.survey || '',
            referenceName: '',
        });
    }, [form]);

    /**
     * Handle form submission
     *
     * @param {Object} e Event
     */
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (edit || formValues.datasetFile.length > 0) {
            if (formValues.survey === 'RESURVEY' && formValues.parentEventId !== '') {
                onResurvey(formValues.parentEventId);
            } else onResurvey(undefined);
            setError(undefined);
            Object.assign(form, formValues);
            onNext(form);
        } else setError(strings.missingDataset);
    };

    /**
     * Remove dataset file
     */
    const removeDataset = async () => {
        try {
            await removeDatasetFile(defaults.datasetId);
            setErrorRemove(false);
            history.replace('/contributions');
        } catch (err) {
            setErrorRemove(true);
        }
        setShowProgress(false);
    };

    /**
     * Start remove dataset process after progress indicator is displayed
     */
    useEffect(() => {
        if (showProgress) removeDataset();
    }, [showProgress]);

    /**
     * Add new reference
     */
    const addReference = () => {
        const arr = [...formValues.references];
        if (formValues.referenceName !== '' && formValues.referenceName.includes('http')) {
            arr.push(formValues.referenceName);
            setFormValues({ ...formValues, referenceName: '', references: arr });
        }
    };

    /**
     * Render survey selector
     *
     * @returns Select survey input
     */
    const renderSurveySelect = () => (
        <>
            <FormControl variant="outlined" fullWidth>
                <InputLabel id="survey-label" required>{strings.labelSurveyType}</InputLabel>
                <Select
                    className="mb-8"
                    labelId="survey-label"
                    id="survey"
                    name="survey"
                    value={formValues.survey}
                    variant="outlined"
                    endAdornment={<InfoIcon info={strings.infoSurvey} />}
                    required
                    label={strings.labelSurveyType}
                    fullWidth
                    onChange={(e) => setFormValues({
                        ...formValues,
                        survey: e.target.value,
                    })}
                >
                    {surveys.map((survey) => (
                        <MenuItem key={survey.value} value={survey.value}>
                            {survey.label}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
            {formValues.survey === 'RESURVEY' && (
                <div className="relative">
                    <span className="absolute -left-7 sm:-left-12 top-0">
                        <span className="-ml-2">
                            <InfoPopover content={strings.infoOriginal} />
                        </span>
                    </span>
                    <Autocomplete
                        id="parentEventId"
                        fullWidth
                        value={formValues.parentEventId && datasets
                            ? datasets.find((element) => element.value === formValues.parentEventId)
                            : null}
                        onChange={(e, val) => setFormValues({
                            ...formValues,
                            parentEventId: val ? val.value : '',
                        })}
                        options={datasets || []}
                        getOptionLabel={(dataset) => dataset.label}
                        noOptionsText={strings.noAlternatives}
                        renderInput={(params) => <TextField {...params} label={strings.labelOriginal} variant="outlined" />}
                        disabled={!datasets || datasets.length === 0}
                    />
                </div>
            )}
        </>
    );

    /**
     * Render required inputs
     *
     * @returns Inputs
     */
    const renderRequiredInputs = () => (
        <>
            {!edit && (
                <FileDrop
                    required
                    accept={fileTypes}
                    maxFiles={1}
                    label={strings.labelDataset}
                    acceptLabel={strings.acceptedFileTypes}
                    info={strings.infoDataset}
                    files={formValues.datasetFile}
                    onUpdate={(files) => setFormValues({
                        ...formValues,
                        datasetFile: files,
                    })}
                />
            )}
            <TextField
                required
                id="description"
                name="description"
                type="text"
                label={strings.labelDescription}
                multiline
                rows={8}
                variant="outlined"
                fullWidth
                value={formValues.description}
                onChange={(e) => setFormValues({
                    ...formValues,
                    description: e.target.value,
                })}
                InputProps={{ endAdornment: <InfoIcon info={strings.infoDescription} /> }}
                inputProps={{ maxLength: 560 }}
            />
            <FormControl variant="outlined" fullWidth>
                <InputLabel id="languages-label" required>{strings.labelLanguages}</InputLabel>
                <Select
                    multiple
                    labelId="languages-label"
                    id="languages"
                    name="languages"
                    value={formValues.languages}
                    variant="outlined"
                    endAdornment={<InfoIcon info={strings.infoLanguages} />}
                    required
                    label={strings.labelLanguages}
                    fullWidth
                    onChange={(e) => setFormValues({
                        ...formValues,
                        languages: e.target.value,
                    })}
                >
                    {languages.map((language) => (
                        <MenuItem key={language.value} value={language.value}>
                            {language.label}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </>
    );

    /**
     * Render optional inputs
     *
     * @returns Inputs
     */
    const renderOptionalInputs = () => (
        <>
            {/* remove to activate illustration file drop */ true ? (
                <div className="mb-6" />
            ) : (
                <FileDrop
                    accept={imageFileTypes}
                    maxFiles={1}
                    label={strings.labelIllustration}
                    acceptLabel={strings.acceptedImageTypes}
                    info={strings.infoImage}
                    files={formValues.image}
                    onUpdate={(files) => setFormValues({
                        ...formValues,
                        image: files,
                    })}
                />
            )}
            <EditableList
                name="references"
                type="url"
                label={strings.labelReferences}
                headerLabel={strings.labelRefs}
                info={strings.infoReferences}
                value={formValues.referenceName}
                options={formValues.references}
                onAdd={() => addReference()}
                onChange={(referenceName) => setFormValues({
                    ...formValues,
                    referenceName,
                })}
                onChangeArr={(references) => setFormValues({
                    ...formValues,
                    references,
                    referenceName: '',
                })}
            />
            <div className="relative">
                <span className="absolute -left-7 sm:-left-12 top-0">
                    <span className="-ml-2">
                        <InfoPopover content={strings.infoParentSet} />
                    </span>
                </span>
                <Autocomplete
                    id="collectionId"
                    fullWidth
                    value={formValues.collectionId && datasets
                        ? datasets.find((element) => element.value === formValues.collectionId)
                        : null}
                    onChange={(e, val) => setFormValues({
                        ...formValues,
                        collectionId: val ? val.value : '',
                    })}
                    options={datasets || []}
                    getOptionLabel={(dataset) => dataset.label}
                    noOptionsText={strings.noAlternatives}
                    renderInput={(params) => <TextField {...params} label={strings.labelSelectCollection} variant="outlined" />}
                    disabled={!datasets || datasets.length === 0}
                />
            </div>
        </>
    );

    /**
     * Render remove dataset button
     *
     * @returns Button
     */
    const renderRemoveDataset = () => (
        <div className="mt-2">
            <Button
                variant="text"
                color="secondary"
                size="medium"
                type="button"
                onClick={() => setOpenConfirm(strings.textConfirmRemoveDataset)}
            >
                {strings.removeDataset}
            </Button>
            {errorRemove && <p className="error text-red-600 mb-8">{strings.errorTryAgain}</p>}
        </div>
    );

    return (
        <>
            <form autoComplete="off" onSubmit={handleSubmit}>
                <h1 className="font-light text-2xl">
                    {createFormHeader(strings.titleAbout, 1)}
                </h1>
                {edit
                    ? renderRemoveDataset()
                    : <p className="mt-6">{strings.infoGeneral}</p>}
                <p className="mb-10 mt-6">{strings.mandatory}</p>
                {renderRequiredInputs()}
                {renderOptionalInputs()}
                {renderSurveySelect()}
                {error && <p className="error text-red-600 mb-8">{error}</p>}
                <NextButton />
            </form>
            <ProgressIndicator open={showProgress} />
            <ConfirmAction
                openContent={openConfirm}
                onClose={() => setOpenConfirm(undefined)}
                onConfirm={() => setShowProgress(true)}
            />
        </>
    );
};

export default InfoForm;
