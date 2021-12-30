const { isWantedType } = require("./utils");

/**
 * 
 * @param {'ru' | 'ua' | 'en'} language 
 * @param {number} count 
 * @param {string} mimetype 
 */
 const calculatePrice = (language, count, mimetype) => {
    const languageToPrice = {
        en: {
            price: 0.12,
            min: 120,
        },
        ru: {
            price: 0.05,
            min: 50,
        },
        ua: {
            price: 0.05,
            min: 50,
        },
    };

    const multiplier = isWantedType(mimetype) ? 1 : 1.2;

    const price = count * languageToPrice[language].price * multiplier;

    return Math.max(price, languageToPrice[language].min);
}

module.exports = {
    calculatePrice,
};