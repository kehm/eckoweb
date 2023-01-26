import React from 'react';
import strings from '../../strings';

/**
 * Show blockchain metrics
 */
const Metrics = () => (
    <div className="bg-lightGrey flex h-15 p-2 sm:p-5 text-center sm:tracking-widest">
        {/* remove to activate metrics */ false && (
            <>
                <div className="sm:w-48">
                    <h1 className="text-sm sm:text-lg">{strings.headerNoDatasets}</h1>
                    <span className="pt-10 text-xl sm:text-2xl font-bold text-yellow-500">0</span>
                </div>
                <div className="flex-grow">
                    <h1 className="text-sm sm:text-lg">{strings.headerDownloads}</h1>
                    <span className="pt-10 text-xl sm:text-2xl font-bold text-yellow-500">0</span>
                </div>
                <div className="flex-grow">
                    <h1 className="text-sm sm:text-lg">{strings.headerMembers}</h1>
                    <span className="pt-10 text-xl sm:text-2xl font-bold text-yellow-500">0</span>
                </div>
                <div className="flex-grow">
                    <h1 className="text-sm sm:text-lg">{strings.headerBlocks}</h1>
                    <span className="pt-10 text-xl sm:text-2xl font-bold text-yellow-500">0</span>
                </div>
            </>
        )}
    </div>
);

export default Metrics;
