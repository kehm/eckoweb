import React, { useState, useContext, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import strings from '../../strings';
import nations from '../../nations';
import InfoIcon from '../components/InfoIcon';
import FormContext from '../../context/FormContext';
import InfoPopover from '../components/InfoPopover';
import MiniMap from '../components/MiniMap';
import BackButton from '../components/buttons/BackButton';
import continents from '../../continents';
import NextButton from '../components/buttons/NextButton';
import createFormHeader from '../../utils/create-form-header';

/**
 * Show form for metadata information
 */
const GeoForm = ({ onPrev, onNext, original }) => {
    const { form } = useContext(FormContext);
    const defaults = form;
    const defaultFormValues = {
        countries: defaults.countries || [],
        continents: defaults.continents || [],
        earliestYearCollected: defaults.earliestYearCollected || '',
        geoReference: defaults.geoReference || '',
        geodeticDatum: defaults.geodeticDatum || '',
        latestYearCollected: defaults.latestYearCollected || '',
        latitude: defaults.latitude || '',
        locationRemarks: defaults.locationRemarks || '',
        longitude: defaults.longitude || '',
        spatialExtent: defaults.spatialExtent || [],
    };
    const [formValues, setFormValues] = useState(defaultFormValues);

    /**
     * Set identical values from original dataset
     */
    useEffect(() => {
        if (original && original.metadata) {
            setFormValues({
                ...formValues,
                countries: original.metadata.countries || formValues.countries,
                continents: original.metadata.continents || formValues.continents,
                geoReference: original.geoReference
                    ? JSON.parse(original.geoReference) : formValues.geoReference,
            });
        }
    }, [original]);

    /**
     * Validate input and handle form submission
     *
     * @param {Object} e Event
     */
    const handleSubmit = (e) => {
        e.preventDefault();
        formValues.spatialExtent = [formValues.latitude, formValues.longitude];
        Object.assign(form, formValues);
        onNext(form);
    };

    /**
     * Render sample years and countries input
     *
     * @returns Inputs
     */
    const renderCountriesAndYears = () => (
        <div className="mt-6">
            <label className="text-sm text-gray-600 relative" htmlFor="sampleYears">
                {strings.labelSampleYears}
                :
                <span className="absolute -left-9 sm:-left-14 top-8">
                    <InfoPopover content={strings.infoSampleYears} />
                </span>
                <div className="flex mt-2">
                    <TextField
                        required
                        fullWidth
                        id="earliestYearCollected"
                        name="earliestYearCollected"
                        type="number"
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
                        required
                        fullWidth
                        id="latestYearCollected"
                        name="latestYearCollected"
                        type="number"
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
            </label>
            <FormControl variant="outlined" fullWidth>
                <InputLabel id="countries-label" required>{strings.labelCountries}</InputLabel>
                <Select
                    multiple
                    labelId="countries-label"
                    id="countries"
                    name="countries"
                    value={formValues.countries}
                    variant="outlined"
                    endAdornment={<InfoIcon info={strings.infoCountries} />}
                    required
                    label={strings.labelCountries}
                    fullWidth
                    onChange={(e) => setFormValues({
                        ...formValues,
                        countries: e.target.value,
                    })}
                    disabled={original !== undefined}
                >
                    {nations.map((nation) => (
                        <MenuItem key={nation.value} value={nation.value}>
                            {nation.label}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
            <div className="mt-8">
                <FormControl variant="outlined" fullWidth>
                    <InputLabel id="continents-label" required>{strings.labelContinents}</InputLabel>
                    <Select
                        multiple
                        labelId="continents-label"
                        id="continents"
                        name="continents"
                        value={formValues.continents}
                        variant="outlined"
                        endAdornment={<InfoIcon info={strings.infoContinents} />}
                        required
                        label={strings.labelContinents}
                        fullWidth
                        onChange={(e) => setFormValues({
                            ...formValues,
                            continents: e.target.value,
                        })}
                        disabled={original !== undefined}
                    >
                        {continents.map((continent) => (
                            <MenuItem key={continent.value} value={continent.value}>
                                {continent.label}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </div>
        </div>
    );

    /**
     * Render geographic info input
     *
     * @returns INputs
     */
    const renderGeoInfo = () => (
        <div className="mt-6">
            <label className="text-sm text-gray-600 relative" htmlFor="spatialExtent">
                {strings.labelSpatialExtent}
                :
                <span className="absolute -left-9 sm:-left-14 top-8">
                    <InfoPopover content={strings.infoSpatialExtent} />
                </span>
                <div className="flex mt-2">
                    <TextField
                        fullWidth
                        id="latitude"
                        name="latitude"
                        type="number"
                        label={strings.labelLatitude}
                        variant="outlined"
                        value={formValues.latitude}
                        onChange={(e) => setFormValues({
                            ...formValues,
                            latitude: e.target.value,
                        })}
                        inputProps={{ min: -90, max: 90, step: 0.000001 }}
                    />
                    <TextField
                        fullWidth
                        id="longitude"
                        name="longitude"
                        type="number"
                        label={strings.labelLongitude}
                        variant="outlined"
                        value={formValues.longitude}
                        onChange={(e) => setFormValues({
                            ...formValues,
                            longitude: e.target.value,
                        })}
                        inputProps={{ min: -180, max: 180, step: 0.000001 }}
                    />
                </div>
            </label>
            <TextField
                id="geodeticDatum"
                name="geodeticDatum"
                type="text"
                label={strings.labelGeodeticDatum}
                variant="outlined"
                fullWidth
                value={formValues.geodeticDatum}
                onChange={(e) => setFormValues({
                    ...formValues,
                    geodeticDatum: e.target.value,
                })}
                InputProps={{ endAdornment: <InfoIcon info={strings.infoGeodeticDatum} /> }}
                inputProps={{ maxLength: 280 }}
            />
            <TextField
                id="locationRemarks"
                name="locationRemarks"
                type="text"
                label={strings.labelLocationRemarks}
                multiline
                rows={6}
                variant="outlined"
                fullWidth
                value={formValues.locationRemarks}
                onChange={(e) => setFormValues({
                    ...formValues,
                    locationRemarks: e.target.value,
                })}
                InputProps={{ endAdornment: <InfoIcon info={strings.infoLocationRemarks} /> }}
                inputProps={{ maxLength: 560 }}
            />
        </div>
    );

    /**
     * Render geographic reference input and map
     *
     * @returns Geo-reference map
     */
    const renderGeoReference = () => (
        <div className="mb-10 m-auto">
            <TextField
                required
                id="geoReference"
                name="geoReference"
                type="text"
                label={`${strings.labelGeoRef} (${strings.clickMap})`}
                variant="outlined"
                fullWidth
                value={formValues.geoReference}
                InputProps={{ endAdornment: <InfoIcon info={strings.infoGeoRef} /> }}
                inputProps={{ maxLength: 280 }}
                disabled={original !== undefined}
            />
            {!original && (
                <MiniMap
                    selectable
                    onSelect={(e) => setFormValues({
                        ...formValues,
                        geoReference: [
                            parseFloat(e.lngLat[1]).toFixed(6),
                            parseFloat(e.lngLat[0]).toFixed(6),
                        ],
                    })}
                    defaultMarker={formValues.geoReference}
                    scrollZoom
                />
            )}
        </div>
    );

    return (
        <form autoComplete="off" onSubmit={handleSubmit}>
            <h1 className="font-light text-2xl">
                {createFormHeader(strings.headerYears, 3)}
            </h1>
            <p className="mt-6 mb-10">{strings.infoGeo}</p>
            {renderCountriesAndYears()}
            {renderGeoInfo()}
            {renderGeoReference()}
            <NextButton />
            <BackButton onClick={onPrev} />
        </form>
    );
};

export default GeoForm;
