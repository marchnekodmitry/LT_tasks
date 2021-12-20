const fs = require('fs');
const path = require('path');

const filesDirectory = path.resolve(__dirname, 'words2kk');

const files = fs.readdirSync(filesDirectory);

/**
 * 
 * @param {Buffer} file 
 * @returns 
 */
const getFileContents = (file) => {
    return file.toString().split('\n');
}

/**
 * 
 * @param {string} file 
 * @returns 
 */
const readFile = (file) => fs.readFileSync(path.resolve(filesDirectory, file))

const filesContents = files
    .map(readFile)
    .map(getFileContents);

const uniqueValues = () => {
    /**
     * 
     * @param {string[]} contents 
     * @returns {string[]}
     */
    const findUniq = (contents) => {
        const entries = {};

        contents.forEach((item) => entries[item] = entries[item] ? entries[item] + 1 : 1);

        return Object.keys(entries).filter((key) => entries[key] === 1);
    }

    return findUniq(filesContents.flat());
}

/**
 * 
 * @param {number} n 
 * @returns
 */
const existAtLeastInNFiles = (n) => {
    /**
     * 
     * @param {string[]} contents 
     * @returns {{ [key: string]: number }}
     */
    const countEntries = (contents) => {
        const entries = {};

        contents.forEach((item) => entries[item] = entries[item] ? entries[item] + 1 : 1);

        return entries;
    }

    /**
     * 
     * @param {string[]} contents 
     * @returns 
     */
    const makeUniq = (contents) => [...new Set(contents)];

    const uniqContents = filesContents.map(makeUniq).flat();

    const entries = countEntries(uniqContents);

    return Object.keys(entries).filter((key) => entries[key] >= n);
}

const existInAllFiles = () => existAtLeastInNFiles(20);

const existInAtLeastTen = () => existAtLeastInNFiles(10);

console.log(uniqueValues());
console.log(existInAllFiles());
console.log(existInAtLeastTen());
