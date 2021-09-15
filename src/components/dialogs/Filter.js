import React, { useState } from 'react';
import Close from '@material-ui/icons/Close';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import strings from '../../strings';

/**
 * Show filter dialog
 */
const Filter = ({ openDialog, onClose, onUpdate }) => {
    const defaultFormValues = {
        datasetId: '',
        earliestYearCollected: '',
        latestYearCollected: '',
        countries: '',
        continents: '',
        survey: '',
        method: '',
        dataType: '',
        taxa: '',
        habitats: '',
    };
    const [formValues, setFormValues] = useState(defaultFormValues);
    const surveys = [
        { value: 'ORIGINAL', label: strings.original },
        { value: 'RESURVEY', label: strings.resurvey },
        { value: 'COMBINATION', label: strings.combination },
    ];

    /**
     * Set filter
     *
     * @param {Object} e Event
     */
    const handleSubmit = (e) => {
        e.preventDefault();
        onUpdate(formValues);
        onClose();
    };

    /**
     * Render inputs for left column
     *
     * @returns Text inputs
     */
    const renderLeftColumn = () => (
        <div className="w-60">
            <TextField
                id="datasetId"
                name="datasetId"
                type="text"
                label={strings.labelId}
                variant="outlined"
                fullWidth
                value={formValues.datasetId}
                onChange={(e) => setFormValues({
                    ...formValues,
                    datasetId: e.target.value,
                })}
                inputProps={{ maxLength: 280 }}
            />
            <div className="flex">
                <TextField
                    id="earliestYearCollected"
                    name="earliestYearCollected"
                    type="number"
                    fullWidth
                    label={strings.labelFrom}
                    variant="outlined"
                    value={formValues.earliestYearCollected}
                    onChange={(e) => setFormValues({
                        ...formValues,
                        earliestYearCollected: e.target.value,
                    })}
                    inputProps={{ min: 1800, max: formValues.latestYearCollected }}
                />
                <TextField
                    id="latestYearCollected"
                    name="latestYearCollected"
                    type="number"
                    fullWidth
                    label={strings.labelTo}
                    variant="outlined"
                    value={formValues.latestYearCollected}
                    onChange={(e) => setFormValues({
                        ...formValues,
                        latestYearCollected: e.target.value,
                    })}
                    inputProps={{
                        min: formValues.earliestYearCollected || 1800,
                        max: new Date().getFullYear(),
                    }}
                />
            </div>
            <TextField
                id="countries"
                name="countries"
                type="text"
                label={strings.labelCountries}
                variant="outlined"
                fullWidth
                value={formValues.countries}
                onChange={(e) => setFormValues({
                    ...formValues,
                    countries: e.target.value,
                })}
                inputProps={{ maxLength: 280 }}
            />
            <TextField
                id="continents"
                name="continents"
                type="text"
                label={strings.labelContinents}
                variant="outlined"
                fullWidth
                value={formValues.continents}
                onChange={(e) => setFormValues({
                    ...formValues,
                    continents: e.target.value,
                })}
                inputProps={{ maxLength: 280 }}
            />
        </div>
    );

    /**
     * Render inputs for right column
     *
     * @returns Select or text inputs
     */
    const renderRightColumn = () => (
        <div className="sm:ml-4 w-60">
            <FormControl variant="outlined" fullWidth>
                <InputLabel id="survey-label">{strings.labelSurveyType}</InputLabel>
                <Select
                    className="mb-8"
                    labelId="survey-label"
                    id="survey"
                    name="survey"
                    value={formValues.survey}
                    variant="outlined"
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
            <TextField
                id="taxa"
                name="taxa"
                type="text"
                label={strings.labelTaxa}
                variant="outlined"
                fullWidth
                value={formValues.taxa}
                onChange={(e) => setFormValues({
                    ...formValues,
                    taxa: e.target.value,
                })}
                inputProps={{ maxLength: 280 }}
            />
            <TextField
                id="habitats"
                name="habitats"
                type="text"
                label={strings.labelHabitats}
                variant="outlined"
                fullWidth
                value={formValues.habitats}
                onChange={(e) => setFormValues({
                    ...formValues,
                    habitats: e.target.value,
                })}
                inputProps={{ maxLength: 280 }}
            />
        </div>
    );

    return (
        <Dialog fullWidth scroll="paper" open={openDialog} onClose={() => onClose()}>
            <form className="font-sans sm:p-4" autoComplete="off" onSubmit={handleSubmit}>
                <DialogTitle>{strings.filterShow}</DialogTitle>
                <DialogContent>
                    <span className="absolute top-1 right-4">
                        <IconButton
                            edge="end"
                            aria-label="close"
                            onClick={() => onClose()}
                        >
                            <Close />
                        </IconButton>
                    </span>
                    <p className="mb-8">{strings.infoFilter}</p>
                    <div className="sm:flex">
                        {renderLeftColumn()}
                        {renderRightColumn()}
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button variant="contained" color="primary" size="medium" type="submit">
                        {strings.filterApply}
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    );
};

export default Filter;
