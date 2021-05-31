import React, { useState, useContext } from 'react';
import 'react-confirm-alert/src/react-confirm-alert.css';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import strings from '../../strings';
import InfoIcon from '../components/InfoIcon';
import FormContext from '../../context/FormContext';
import BackButton from '../components/BackButton';
import NextButton from '../components/NextButton';
import createFormHeader from '../../utils/create-form-header';

/**
 * Show form for sampling information
 */
const SamplingForm = ({ onPrev, onNext }) => {
    const { form } = useContext(FormContext);
    const defaults = form;
    const defaultFormValues = {
        measurementRemarks: defaults.measurementRemarks || '',
        plotNumber: defaults.plotNumber || '',
        sampleSizeUnit: defaults.sampleSizeUnit || '',
        sampleSizeValue: defaults.sampleSizeValue || '',
        samplingProtocol: defaults.samplingProtocol || '',
        samplingProtocolReference: defaults.samplingProtocolReference || '',
    };
    const [formValues, setFormValues] = useState(defaultFormValues);

    const protocols = [
        { value: 'PLOTS', label: 'Plots' },
        { value: 'TRANSECT', label: 'Transect' },
        { value: 'OTHER', label: 'Other' },
    ];
    const units = [
        { value: 'MINUTE', label: 'Minute' },
        { value: 'HOUR', label: 'Hour' },
        { value: 'DAY', label: 'Day' },
        { value: 'METRE', label: 'Metre' },
        { value: 'SQUARE_METRE', label: 'Square metre' },
        { value: 'CUBIC_METRE', label: 'Cubic metre' },
    ];

    /**
     * Submit form
     *
     * @param {Object} e Event
     */
    const handleSubmit = (e) => {
        e.preventDefault();
        Object.assign(form, formValues);
        onNext(form);
    };

    /**
     * Render input fields
     *
     * @returns Inputs
     */
    const renderInputs = () => (
        <>
            <FormControl variant="outlined" fullWidth>
                <InputLabel id="samplingProtocol-label" required>{strings.labelProtocol}</InputLabel>
                <Select
                    className="mb-8"
                    labelId="samplingProtocol-label"
                    id="samplingProtocol"
                    name="samplingProtocol"
                    value={formValues.samplingProtocol}
                    variant="outlined"
                    endAdornment={<InfoIcon info={strings.infoProtocol} />}
                    required
                    label={strings.labelProtocol}
                    fullWidth
                    onChange={(e) => setFormValues({
                        ...formValues,
                        samplingProtocol: e.target.value,
                    })}
                >
                    {protocols.map((protocol) => (
                        <MenuItem key={protocol.value} value={protocol.value}>
                            {protocol.label}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
            <TextField
                id="samplingProtocolReference"
                name="samplingProtocolReference"
                type="url"
                label={strings.labelProtocolRef}
                variant="outlined"
                fullWidth
                value={formValues.samplingProtocolReference}
                onChange={(e) => setFormValues({
                    ...formValues,
                    samplingProtocolReference: e.target.value,
                })}
                InputProps={{ endAdornment: <InfoIcon info={strings.infoProtocolRef} /> }}
                inputProps={{ maxLength: 280 }}
            />
            <FormControl variant="outlined" fullWidth>
                <InputLabel id="sampleSizeUnit-label" required>{strings.labelUnit}</InputLabel>
                <Select
                    className="mb-8"
                    labelId="sampleSizeUnit-label"
                    id="sampleSizeUnit"
                    name="sampleSizeUnit"
                    value={formValues.sampleSizeUnit}
                    variant="outlined"
                    endAdornment={<InfoIcon info={strings.infoUnit} />}
                    required
                    label={strings.labelUnit}
                    fullWidth
                    onChange={(e) => setFormValues({
                        ...formValues,
                        sampleSizeUnit: e.target.value,
                    })}
                >
                    {units.map((unit) => (
                        <MenuItem key={unit.value} value={unit.value}>
                            {unit.label}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
            <TextField
                id="sampleSizeValue"
                name="sampleSizeValue"
                type="number"
                label={strings.labelSampleValue}
                variant="outlined"
                fullWidth
                value={formValues.sampleSizeValue}
                onChange={(e) => setFormValues({
                    ...formValues,
                    sampleSizeValue: e.target.value,
                })}
                InputProps={{ endAdornment: <InfoIcon info={strings.infoSampleValue} /> }}
                inputProps={{ min: 0, max: 99999, step: 0.01 }}
            />
            <TextField
                id="plotNumber"
                name="plotNumber"
                type="number"
                label={strings.labelPlotNumber}
                variant="outlined"
                fullWidth
                value={formValues.plotNumber}
                onChange={(e) => setFormValues({
                    ...formValues,
                    plotNumber: e.target.value,
                })}
                InputProps={{ endAdornment: <InfoIcon info={strings.infoPlotNumber} /> }}
                inputProps={{ min: 0, max: 99999 }}
            />
            <TextField
                id="measurementRemarks"
                name="measurementRemarks"
                type="text"
                label={strings.labelMeasurement}
                multiline
                rows={6}
                variant="outlined"
                fullWidth
                value={formValues.measurementRemarks}
                onChange={(e) => setFormValues({
                    ...formValues,
                    measurementRemarks: e.target.value,
                })}
                InputProps={{ endAdornment: <InfoIcon info={strings.infoMeasurement} /> }}
                inputProps={{ maxLength: 560 }}
            />
        </>
    );

    return (
        <form autoComplete="off" onSubmit={handleSubmit}>
            <h1 className="font-light text-2xl">
                {createFormHeader(strings.headerSampling, 2)}
            </h1>
            <p className="mt-6 mb-10">{strings.infoSampling}</p>
            {renderInputs()}
            <NextButton />
            <BackButton onClick={onPrev} />
        </form>
    );
};

export default SamplingForm;
