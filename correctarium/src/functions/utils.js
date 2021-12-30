/**
 * 
 * @param {string} mimetype 
 * @returns 
 */
const isWantedType = (mimetype) => {
    const wantedTypes = ['doc', 'docx', 'rtf'];

    return wantedTypes.includes(mimetype);
}

module.exports = {
    isWantedType,
};