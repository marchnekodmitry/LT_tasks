const { isWantedType } = require("./utils");

/**
 * 
 * @param {'ru' | 'ua' | 'en'} language 
 * @param {number} count 
 * @param {string} mimetype 
 */
const calculateWorkingMinutes = (language, count, mimetype) => {
    const languageToSymbolsPerHour = {
        en: 333,
        ru: 1333,
        ua: 1333,
    };

    const multiplier = isWantedType(mimetype) ? 1 : 1.2;

    return Math.max(Math.ceil(count / languageToSymbolsPerHour[language] * multiplier * 60) + 30, 60);
}

module.exports = {
    calculateWorkingMinutes,
};