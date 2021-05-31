import React from 'react';
import strings from '../../strings';
import { parseContinents, parseCountries, parseLanguages } from '../../utils/metadata-parser';
import InfoPopover from '../components/InfoPopover';
import LicenseLink from '../components/LicenseLink';

/**
 * Render metadata
 */
const Metadata = ({ dataset, licenses }) => {
    /**
     * Render sampling related metadata
     *
     * @returns List
     */
    const renderSamplingInfo = () => (
        <dl className="max-w-xl">
            {dataset.metadata.earliestYearCollected !== undefined && (
                <>
                    <dt className="relative float-left mr-4 font-light w-44">
                        <span className="absolute -left-12 -top-2">
                            <InfoPopover content={strings.infoSampleYears} />
                        </span>
                        {strings.labelSampleYears}
                        :
                    </dt>
                    <dd>
                        {dataset.metadata.earliestYearCollected}
                        {dataset.metadata.latestYearCollected
                            && dataset.metadata.latestYearCollected
                            !== dataset.metadata.earliestYearCollected
                            ? ` - ${dataset.metadata.latestYearCollected}` : ''}
                    </dd>
                </>
            )}
            {dataset.metadata.speciesNumber !== undefined && (
                <>
                    <dt className="relative float-left mr-4 font-light w-44">
                        <span className="absolute -left-12 -top-2">
                            <InfoPopover content={strings.infoNoSpecies} />
                        </span>
                        {strings.labelNoSpecies}
                        :
                    </dt>
                    <dd>{dataset.metadata.speciesNumber}</dd>
                </>
            )}
            {dataset.metadata.sampleSizeValue !== undefined && (
                <>
                    <dt className="relative float-left mr-4 font-light w-44">
                        <span className="absolute -left-12 -top-2">
                            <InfoPopover content={strings.infoSampleValue} />
                        </span>
                        {strings.labelSampleValue}
                        :
                    </dt>
                    <dd>{dataset.metadata.sampleSizeValue}</dd>
                </>
            )}
            {dataset.metadata.sampleSizeUnit && (
                <>
                    <dt className="relative float-left mr-4 font-light w-44">
                        <span className="absolute -left-12 -top-2">
                            <InfoPopover content={strings.infoUnit} />
                        </span>
                        {strings.labelUnit}
                        :
                    </dt>
                    <dd>{`${dataset.metadata.sampleSizeUnit.charAt(0)}${dataset.metadata.sampleSizeUnit.substring(1).replace(/_/, ' ').toLowerCase()}`}</dd>
                </>
            )}
            {dataset.metadata.samplingProtocol && (
                <>
                    <dt className="relative float-left mr-4 font-light w-44">
                        <span className="absolute -left-12 -top-2">
                            <InfoPopover content={strings.infoProtocol} />
                        </span>
                        {strings.labelProtocol}
                        :
                    </dt>
                    <dd>{`${dataset.metadata.samplingProtocol.charAt(0)}${dataset.metadata.samplingProtocol.substring(1).toLowerCase()}`}</dd>
                </>
            )}
            {dataset.metadata.samplingProtocolReference && (
                <>
                    <dt className="relative mr-4 font-light w-44">
                        <span className="absolute -left-12 -top-2">
                            <InfoPopover content={strings.infoProtocolRef} />
                        </span>
                        {strings.labelReference}
                        :
                    </dt>
                    <dd>
                        <a
                            className="text-blue-400 block overflow-hidden overflow-ellipsis"
                            target="_blank"
                            rel="noopener noreferrer"
                            href={dataset.metadata.samplingProtocolReference}
                        >
                            {dataset.metadata.samplingProtocolReference}
                        </a>
                    </dd>
                </>
            )}
            {dataset.metadata.measurementRemarks && (
                <>
                    <dt className="relative mr-4 font-light w-44">
                        <span className="absolute -left-12 -top-2">
                            <InfoPopover content={strings.infoMeasurement} />
                        </span>
                        {strings.labelMeasurement}
                        :
                    </dt>
                    <dd>{dataset.metadata.measurementRemarks}</dd>
                </>
            )}
            {dataset.metadata.spatialExtent && (
                <>
                    <dt className="relative float-left mr-4 font-light w-44">
                        <span className="absolute -left-12 -top-2">
                            <InfoPopover content={strings.infoSpatialExtent} />
                        </span>
                        {strings.labelSpatialExtent}
                        :
                    </dt>
                    <dd>{`${dataset.metadata.spatialExtent}`.replace(/,/g, ', ')}</dd>
                </>
            )}
            {dataset.metadata.geodeticDatum && (
                <>
                    <dt className="relative float-left mr-4 font-light w-44">
                        <span className="absolute -left-12 -top-2">
                            <InfoPopover content={strings.infoGeodeticDatum} />
                        </span>
                        {strings.labelGeodeticDatum}
                        :
                    </dt>
                    <dd>{dataset.metadata.geodeticDatum}</dd>
                </>
            )}
            {dataset.metadata.locationRemarks && (
                <>
                    <dt className="relative mr-4 font-light w-44">
                        <span className="absolute -left-12 -top-2">
                            <InfoPopover content={strings.infoLocationRemarks} />
                        </span>
                        {strings.labelLocationRemarks}
                        :
                    </dt>
                    <dd>{dataset.metadata.locationRemarks}</dd>
                </>
            )}
        </dl>
    );

    /**
     * Render geographical info list
     *
     * @returns List
     */
    const renderGeoInfo = () => (
        <dl className="mt-10 max-w-xl">
            {dataset.metadata.languages && (
                <>
                    <dt className="mr-4 font-light w-60">
                        {strings.labelLanguages}
                        :
                    </dt>
                    <dd>{parseLanguages(dataset.metadata.languages)}</dd>
                </>
            )}
            {dataset.metadata.countries && (
                <>
                    <dt className="mr-4 font-light w-60">
                        {strings.labelCountries}
                        :
                    </dt>
                    <dd>{parseCountries(dataset.metadata.countries)}</dd>
                </>
            )}
            {dataset.metadata.continents && (
                <>
                    <dt className="mr-4 font-light w-60">
                        {strings.labelContinents}
                        :
                    </dt>
                    <dd>{parseContinents(dataset.metadata.continents)}</dd>
                </>
            )}
            {dataset.metadata.taxa && (
                <>
                    <dt className="mr-4 font-light w-60">
                        {strings.headerMetadata}
                        :
                    </dt>
                    <dd>{JSON.stringify(dataset.metadata.taxa).replace(/[[\]"]/g, '').replace(/,/g, ', ')}</dd>
                </>
            )}
            {dataset.metadata.habitats && (
                <>
                    <dt className="mr-4 font-light w-60">
                        {strings.labelHabitats}
                        :
                    </dt>
                    <dd>{JSON.stringify(dataset.metadata.habitats).replace(/[[\]"]/g, '').replace(/,/g, ', ')}</dd>
                </>
            )}
        </dl>
    );

    /**
     * Render reference info list
     *
     * @returns List
     */
    const renderCiteInfo = () => (
        <dl className="mt-10 max-w-xl">
            {dataset.metadata.references && (
                <>
                    <dt className="mr-4 font-light w-60">
                        {strings.labelRefs}
                        :
                    </dt>
                    <dd>
                        {dataset.metadata.references.map((reference) => (
                            <a
                                key={reference}
                                className="text-blue-400 block overflow-hidden overflow-ellipsis"
                                target="_blank"
                                rel="noopener noreferrer"
                                href={reference}
                            >
                                {reference}
                            </a>
                        ))}
                    </dd>
                </>
            )}
            {dataset.contributors && (
                <>
                    <dt className="mr-4 font-light w-60">
                        {strings.labelContributors}
                        :
                    </dt>
                    <dd>{JSON.stringify(dataset.contributors).replace(/[[\]"]/g, '').replace(/,/g, ', ')}</dd>
                </>
            )}
            {dataset.bibliographicCitation && (
                <>
                    <dt className="mr-4 font-light w-60">
                        {strings.labelCitation}
                        :
                    </dt>
                    <dd>{dataset.bibliographicCitation}</dd>
                </>
            )}
        </dl>
    );

    if (dataset.metadata && dataset.policy) {
        let license;
        if (dataset.policy.license) {
            license = licenses.find((element) => element.code === dataset.policy.license);
        }
        return (
            <div className="mt-14">
                {renderSamplingInfo()}
                {renderGeoInfo()}
                {renderCiteInfo()}
                {license && (
                    <div className="relative mt-10 max-w-xl">
                        <span className="absolute -left-12 -top-2">
                            <InfoPopover content={strings.infoDatasetLicense} />
                        </span>
                        <LicenseLink license={license} />
                    </div>
                )}
            </div>
        );
    }
    return null;
};

export default Metadata;
