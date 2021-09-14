import React, { useContext, useState } from 'react';
import TextField from '@material-ui/core/TextField';
import strings from '../../strings';
import InfoIcon from '../components/InfoIcon';
import FormContext from '../../context/FormContext';
import BackButton from '../components/buttons/BackButton';
import EditableList from '../components/lists/EditableList';
import NextButton from '../components/buttons/NextButton';
import createFormHeader from '../../utils/create-form-header';

/**
 * Show form for metadata information
 */
const MetaForm = ({ onPrev, onNext }) => {
    const { form } = useContext(FormContext);
    const defaults = form;
    const defaultFormValues = {
        habitatName: '',
        taxonName: '',
        habitats: defaults.habitats || [],
        taxa: defaults.taxa || [],
        speciesNumber: defaults.speciesNumber || '',
    };
    const [formValues, setFormValues] = useState(defaultFormValues);

    /**
     * Validate input and handle form submission
     *
     * @param {Object} e Event
     */
    const handleSubmit = (e) => {
        e.preventDefault();
        Object.assign(form, formValues);
        onNext(form);
    };

    /**
     * Add new habitat
     */
    const addHabitat = () => {
        const arr = [...formValues.habitats];
        if (formValues.habitatName !== '') {
            arr.push(formValues.habitatName);
            setFormValues({ ...formValues, habitatName: '', habitats: arr });
        }
    };

    /**
     * Add new taxon
     */
    const addTaxon = () => {
        const arr = [...formValues.taxa];
        if (formValues.taxonName !== '') {
            arr.push(formValues.taxonName);
            setFormValues({ ...formValues, taxonName: '', taxa: arr });
        }
    };

    /**
     * Render text input fields
     */
    const renderInputs = () => (
        <>
            <EditableList
                name="habitats"
                label={strings.labelHabitat}
                headerLabel={strings.labelAddHabitat}
                info={strings.infoHabitat}
                value={formValues.habitatName}
                options={formValues.habitats}
                onAdd={() => addHabitat()}
                onChange={(habitatName) => setFormValues({
                    ...formValues,
                    habitatName,
                })}
                onChangeArr={(habitats) => setFormValues({
                    ...formValues,
                    habitats,
                    habitatName: '',
                })}
            />
            <EditableList
                name="taxa"
                label={strings.labelTaxon}
                headerLabel={strings.labelAddTaxa}
                info={strings.infoTaxon}
                value={formValues.taxonName}
                options={formValues.taxa}
                onAdd={() => addTaxon()}
                onChange={(taxonName) => setFormValues({
                    ...formValues,
                    taxonName,
                })}
                onChangeArr={(taxa) => setFormValues({
                    ...formValues,
                    taxa,
                    taxonName: '',
                })}
            />
            <TextField
                id="speciesNumber"
                name="speciesNumber"
                type="number"
                label={strings.labelNoSpecies}
                variant="outlined"
                fullWidth
                value={formValues.speciesNumber}
                onChange={(e) => setFormValues({
                    ...formValues,
                    speciesNumber: e.target.value,
                })}
                InputProps={{ endAdornment: <InfoIcon info={strings.infoNoSpecies} /> }}
                inputProps={{ min: 0, max: 99999 }}
            />
        </>
    );

    return (
        <form autoComplete="off" onSubmit={handleSubmit}>
            <h1 className="font-light text-2xl">
                {createFormHeader(strings.headerMetadata, 4)}
            </h1>
            <p className="mt-6 mb-10">{strings.infoMetadata}</p>
            {renderInputs()}
            <NextButton />
            <BackButton onClick={onPrev} />
        </form>
    );
};

export default MetaForm;
