/**
 * Format date
 *
 * @param {string} date Timestamp
 * @param {boolean} values True if date only (no hours/mins)
 */
const formatDate = (date, dateOnly) => {
    const localDate = new Date(date);
    if (dateOnly) {
        return `${localDate.getDate()}-${localDate.getMonth() + 1}-${localDate.getFullYear()}`;
    }
    let hours = localDate.getHours();
    let mins = localDate.getMinutes();
    if (hours < 10) hours = `0${hours}`;
    if (mins < 10) mins = `0${mins}`;
    return `${localDate.getDate()}-${localDate.getMonth() + 1}-${localDate.getFullYear()} ${hours}:${mins}`;
};

export default formatDate;
