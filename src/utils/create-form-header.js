import strings from '../strings';

/**
 * Create form header text
 *
 * @param {string} header Header text
 * @param {int} step Step
 * @returns {string} Form header text
 */
const createFormHeader = (header, step) => `${header} (${strings.step} ${step}/6)`;

export default createFormHeader;
