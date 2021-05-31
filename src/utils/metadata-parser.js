import continents from '../continents';
import languages from '../languages';
import nations from '../nations';

/**
 * Parse country codes to a stringified country name list
 *
 * @param {Array} arr Country codes
 * @returns {string} Stringified array
 */
export const parseCountries = (arr) => {
    const countries = [];
    arr.forEach((value) => {
        countries.push(
            nations.find((element) => element.value.toUpperCase() === value.toUpperCase()).label,
        );
    });
    return JSON.stringify(countries).replace(/[[\]"]/g, '').replace(/,/g, ', ');
};

/**
 * Parse continent codes to a stringified continent name list
 * @param {Array} arr Continent codes
 * @returns {string} Stringified array
 */
export const parseContinents = (arr) => {
    const values = [];
    arr.forEach((value) => {
        values.push(
            continents.find((element) => element.value.toUpperCase() === value.toUpperCase()).label,
        );
    });
    return JSON.stringify(values).replace(/[[\]"]/g, '').replace(/,/g, ', ');
};

/**
 * Parse language code array to a stringified language name list
 *
 * @param {Array} arr Language codes
 * @returns {string} Stringified array
 */
export const parseLanguages = (arr) => {
    const langs = [];
    arr.forEach((value) => {
        langs.push(
            languages.find((element) => element.value.toUpperCase() === value.toUpperCase()).label,
        );
    });
    return JSON.stringify(langs).replace(/[[\]"]/g, '').replace(/,/g, ', ');
};
