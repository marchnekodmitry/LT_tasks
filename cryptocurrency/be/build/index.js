/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./api/coinMarketCap/api.ts":
/*!**********************************!*\
  !*** ./api/coinMarketCap/api.ts ***!
  \**********************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\n    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }\n    return new (P || (P = Promise))(function (resolve, reject) {\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\n        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\n    });\n};\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.listingsLatest = void 0;\nconst axios_1 = __importDefault(__webpack_require__(/*! axios */ \"axios\"));\nconst mapping_1 = __webpack_require__(/*! ./mapping */ \"./api/coinMarketCap/mapping.ts\");\nconst listingsLatest = () => __awaiter(void 0, void 0, void 0, function* () {\n    const response = yield axios_1.default.get('https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest', {\n        headers: {\n            'X-CMC_PRO_API_KEY': \"f6b23270-09fd-4fe9-b7fe-17ff50744077\",\n        },\n    });\n    return response.data.data.map(mapping_1.mapListingLatest);\n});\nexports.listingsLatest = listingsLatest;\n\n\n//# sourceURL=webpack:///./api/coinMarketCap/api.ts?");

/***/ }),

/***/ "./api/coinMarketCap/mapping.ts":
/*!**************************************!*\
  !*** ./api/coinMarketCap/mapping.ts ***!
  \**************************************/
/***/ ((__unused_webpack_module, exports) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.mapListingLatest = void 0;\nconst mapListingLatest = (data) => ({\n    cryptocurrencyName: data.symbol,\n    priceUsd: data.quote['USD'].price,\n    rank: data.cmc_rank,\n    platformName: 'coinmarketcap',\n});\nexports.mapListingLatest = mapListingLatest;\n\n\n//# sourceURL=webpack:///./api/coinMarketCap/mapping.ts?");

/***/ }),

/***/ "./api/coinpaprika/api.ts":
/*!********************************!*\
  !*** ./api/coinpaprika/api.ts ***!
  \********************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\n    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }\n    return new (P || (P = Promise))(function (resolve, reject) {\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\n        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\n    });\n};\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.tickers = void 0;\nconst axios_1 = __importDefault(__webpack_require__(/*! axios */ \"axios\"));\nconst mapping_1 = __webpack_require__(/*! ./mapping */ \"./api/coinpaprika/mapping.ts\");\nconst tickers = () => __awaiter(void 0, void 0, void 0, function* () {\n    const response = yield axios_1.default.get('https://api.coinpaprika.com/v1/tickers');\n    return response.data.map(mapping_1.mapTickers);\n});\nexports.tickers = tickers;\n\n\n//# sourceURL=webpack:///./api/coinpaprika/api.ts?");

/***/ }),

/***/ "./api/coinpaprika/mapping.ts":
/*!************************************!*\
  !*** ./api/coinpaprika/mapping.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, exports) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.mapTickers = void 0;\nconst mapTickers = (data) => ({\n    cryptocurrencyName: data.symbol,\n    priceUsd: data.quotes.USD.price,\n    rank: data.rank,\n    platformName: 'coinpaprika',\n});\nexports.mapTickers = mapTickers;\n\n\n//# sourceURL=webpack:///./api/coinpaprika/mapping.ts?");

/***/ }),

/***/ "./api/coinstats/api.ts":
/*!******************************!*\
  !*** ./api/coinstats/api.ts ***!
  \******************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\n    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }\n    return new (P || (P = Promise))(function (resolve, reject) {\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\n        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\n    });\n};\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.coins = void 0;\nconst axios_1 = __importDefault(__webpack_require__(/*! axios */ \"axios\"));\nconst mapping_1 = __webpack_require__(/*! ./mapping */ \"./api/coinstats/mapping.ts\");\nconst coins = () => __awaiter(void 0, void 0, void 0, function* () {\n    const response = yield axios_1.default.get('https://api.coinstats.app/public/v1/coins?currency=USD');\n    return response.data.coins.map(mapping_1.mapCoins);\n});\nexports.coins = coins;\n\n\n//# sourceURL=webpack:///./api/coinstats/api.ts?");

/***/ }),

/***/ "./api/coinstats/mapping.ts":
/*!**********************************!*\
  !*** ./api/coinstats/mapping.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, exports) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.mapCoins = void 0;\nconst mapCoins = (data) => ({\n    cryptocurrencyName: data.symbol,\n    priceUsd: data.price,\n    rank: data.rank,\n    platformName: 'coinstats',\n});\nexports.mapCoins = mapCoins;\n\n\n//# sourceURL=webpack:///./api/coinstats/mapping.ts?");

/***/ }),

/***/ "./controllers/cryptocurrency.ts":
/*!***************************************!*\
  !*** ./controllers/cryptocurrency.ts ***!
  \***************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\n    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }\n    return new (P || (P = Promise))(function (resolve, reject) {\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\n        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\n    });\n};\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nconst express_1 = __importDefault(__webpack_require__(/*! express */ \"express\"));\nconst cryptocurrency_1 = __importDefault(__webpack_require__(/*! @/repositories/cryptocurrency */ \"./repositories/cryptocurrency.ts\"));\nconst api_1 = __webpack_require__(/*! @/api/coinMarketCap/api */ \"./api/coinMarketCap/api.ts\");\nconst api_2 = __webpack_require__(/*! @/api/coinpaprika/api */ \"./api/coinpaprika/api.ts\");\nconst api_3 = __webpack_require__(/*! @/api/coinstats/api */ \"./api/coinstats/api.ts\");\nclass CryptocurrencyController {\n    constructor(db) {\n        this.latestCryptocurrencies = (req, res, next) => __awaiter(this, void 0, void 0, function* () {\n            const response = yield this.cryptocurrencyRepository.getLatestCryptocurrencies();\n            res.status(200).json(response);\n        });\n        this.updateCryptocurrencies = () => __awaiter(this, void 0, void 0, function* () {\n            const cryptocurrencies = yield this.getCryptocurrencies();\n            yield this.cryptocurrencyRepository.rewriteLatestCryptocurrencies(cryptocurrencies);\n        });\n        this.getCryptocurrencies = () => __awaiter(this, void 0, void 0, function* () {\n            const responseCMC = yield (0, api_1.listingsLatest)();\n            const responseCP = yield (0, api_2.tickers)();\n            const responseCS = yield (0, api_3.coins)();\n            const timestamp = Date.now();\n            const marketsData = [responseCMC, responseCP, responseCS];\n            const map = new Map();\n            marketsData.forEach((marketData) => {\n                marketData.forEach(({ cryptocurrencyName, rank, priceUsd, platformName }) => {\n                    const item = map.get(cryptocurrencyName);\n                    if (!item) {\n                        map.set(cryptocurrencyName, {\n                            cryptocurrencyName,\n                            markets: 1,\n                            rank,\n                            price: {\n                                [platformName]: priceUsd,\n                            },\n                        });\n                    }\n                    else {\n                        if (item.price[platformName])\n                            return;\n                        map.set(cryptocurrencyName, {\n                            cryptocurrencyName,\n                            markets: item.markets + 1,\n                            rank: item.rank + rank,\n                            price: Object.assign(Object.assign({}, item.price), { [platformName]: priceUsd }),\n                        });\n                    }\n                });\n            });\n            const topCryptocurrencies = Array.from(map.values()).sort((data1, data2) => {\n                if (data1.markets !== data2.markets)\n                    return data2.markets - data1.markets;\n                return data1.rank - data2.rank;\n            }).slice(0, 20);\n            return topCryptocurrencies.map((item) => ({\n                cryptocurrencyName: item.cryptocurrencyName,\n                timestamp,\n                coinpaprikaValue: item.price.coinpaprika,\n                coinstatsValue: item.price.coinstats,\n                coinmarketcapValue: item.price.coinmarketcap,\n            }));\n        });\n        this.cryptocurrencyRepository = new cryptocurrency_1.default(db.connection);\n        this.router = express_1.default.Router();\n        this.router.get(\"/latestCryptocurrencies\", this.latestCryptocurrencies);\n    }\n}\nexports[\"default\"] = CryptocurrencyController;\n\n\n//# sourceURL=webpack:///./controllers/cryptocurrency.ts?");

/***/ }),

/***/ "./database/index.ts":
/*!***************************!*\
  !*** ./database/index.ts ***!
  \***************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\n    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }\n    return new (P || (P = Promise))(function (resolve, reject) {\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\n        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\n    });\n};\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nvar _a;\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nconst promise_1 = __importDefault(__webpack_require__(/*! mysql2/promise */ \"mysql2/promise\"));\nclass Database {\n    constructor(connection) {\n        this.connection = connection;\n    }\n}\n_a = Database;\nDatabase.init = () => __awaiter(void 0, void 0, void 0, function* () {\n    const connection = yield promise_1.default.createConnection({\n        host: '127.0.0.1',\n        user: 'root',\n        password: 'Dmarchenko1@',\n        database: 'cryptocurrency',\n    });\n    console.log('Database connected');\n    return new Database(connection);\n});\nexports[\"default\"] = Database;\n\n\n//# sourceURL=webpack:///./database/index.ts?");

/***/ }),

/***/ "./database/utils/date.ts":
/*!********************************!*\
  !*** ./database/utils/date.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, exports) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.SQLTimestampToTimestamp = exports.timestampToSQLTimestamp = void 0;\nconst timestampToSQLTimestamp = (timestamp) => {\n    return new Date(timestamp).toISOString().replace(\"T\", \" \").slice(0, 19);\n};\nexports.timestampToSQLTimestamp = timestampToSQLTimestamp;\nconst SQLTimestampToTimestamp = (sqlTimestamp) => {\n    return sqlTimestamp.getTime();\n};\nexports.SQLTimestampToTimestamp = SQLTimestampToTimestamp;\n\n\n//# sourceURL=webpack:///./database/utils/date.ts?");

/***/ }),

/***/ "./index.ts":
/*!******************!*\
  !*** ./index.ts ***!
  \******************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\n    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }\n    return new (P || (P = Promise))(function (resolve, reject) {\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\n        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\n    });\n};\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nconst express_1 = __importDefault(__webpack_require__(/*! express */ \"express\"));\nconst body_parser_1 = __importDefault(__webpack_require__(/*! body-parser */ \"body-parser\"));\nconst cryptocurrency_1 = __importDefault(__webpack_require__(/*! @/controllers/cryptocurrency */ \"./controllers/cryptocurrency.ts\"));\nconst error_1 = __importDefault(__webpack_require__(/*! ./middlewares/error */ \"./middlewares/error.ts\"));\nconst syntaxError_1 = __importDefault(__webpack_require__(/*! ./middlewares/syntaxError */ \"./middlewares/syntaxError.ts\"));\nconst database_1 = __importDefault(__webpack_require__(/*! ./database */ \"./database/index.ts\"));\nconst app = (0, express_1.default)();\nconst PORT = 3103;\nconst main = () => __awaiter(void 0, void 0, void 0, function* () {\n    const db = yield database_1.default.init();\n    const cc = new cryptocurrency_1.default(db);\n    app.use(body_parser_1.default.json({\n        limit: '100kb',\n        type: '*/*'\n    }));\n    app.use(syntaxError_1.default);\n    app.use(cc.router);\n    app.use(error_1.default);\n    app.listen(PORT, () => {\n        console.log(`App listening at http://localhost:${PORT}`);\n    });\n});\nmain();\n\n\n//# sourceURL=webpack:///./index.ts?");

/***/ }),

/***/ "./middlewares/error.ts":
/*!******************************!*\
  !*** ./middlewares/error.ts ***!
  \******************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nconst error_1 = __importDefault(__webpack_require__(/*! @/utils/error */ \"./utils/error.ts\"));\nconst errorMiddleware = (error, request, response, next) => {\n    if (error instanceof error_1.default) {\n        response.status(error.status).send({\n            error: {\n                message: error.message,\n            },\n        });\n        return;\n    }\n    if (error instanceof Error) {\n        response.status(500).send({\n            error: {\n                message: error.message,\n            },\n        });\n        return;\n    }\n    response.status(500).send({\n        error: {\n            message: 'Internal Server Error',\n        },\n    });\n};\nexports[\"default\"] = errorMiddleware;\n\n\n//# sourceURL=webpack:///./middlewares/error.ts?");

/***/ }),

/***/ "./middlewares/syntaxError.ts":
/*!************************************!*\
  !*** ./middlewares/syntaxError.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, exports) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nconst syntaxErrorMiddleware = (error, request, response, next) => {\n    if (error.name == 'SyntaxError') {\n        response.status(400);\n        response.send({\n            status: 400,\n            message: \"Bad Request!\"\n        });\n    }\n    next();\n};\nexports[\"default\"] = syntaxErrorMiddleware;\n\n\n//# sourceURL=webpack:///./middlewares/syntaxError.ts?");

/***/ }),

/***/ "./repositories/cryptocurrency.ts":
/*!****************************************!*\
  !*** ./repositories/cryptocurrency.ts ***!
  \****************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\n    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }\n    return new (P || (P = Promise))(function (resolve, reject) {\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\n        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\n    });\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nconst date_1 = __webpack_require__(/*! @/database/utils/date */ \"./database/utils/date.ts\");\nclass CryptocurrencyRepository {\n    constructor(connection) {\n        this.getLatestCryptocurrencies = () => __awaiter(this, void 0, void 0, function* () {\n            const [response] = yield this.connection.execute({\n                sql: \"SELECT * FROM latestCryptocurrencies;\",\n            });\n            const data = response;\n            return data.map((item) => (Object.assign(Object.assign({}, item), { timestamp: (0, date_1.SQLTimestampToTimestamp)(item.timestamp) })));\n        });\n        this.rewriteLatestCryptocurrencies = (cryptocurrencies) => __awaiter(this, void 0, void 0, function* () {\n            yield this.connection.execute(\"DELETE FROM latestCryptocurrencies;\");\n            const values = cryptocurrencies.map(({ cryptocurrencyName, timestamp, coinpaprikaValue, coinstatsValue, coinmarketcapValue, }) => [cryptocurrencyName, (0, date_1.timestampToSQLTimestamp)(timestamp), coinpaprikaValue, coinstatsValue, coinmarketcapValue]);\n            const sql = this.connection.format(`INSERT INTO latestCryptocurrencies (cryptocurrencyName, timestamp, coinpaprikaValue, coinstatsValue, coinmarketcapValue) VALUES ?`, [values]);\n            yield this.connection.execute(sql);\n        });\n        this.connection = connection;\n    }\n}\nexports[\"default\"] = CryptocurrencyRepository;\n\n\n//# sourceURL=webpack:///./repositories/cryptocurrency.ts?");

/***/ }),

/***/ "./utils/error.ts":
/*!************************!*\
  !*** ./utils/error.ts ***!
  \************************/
/***/ ((__unused_webpack_module, exports) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nclass APIError extends Error {\n    constructor(status, message) {\n        super(message);\n        this.status = status;\n    }\n}\nexports[\"default\"] = APIError;\n\n\n//# sourceURL=webpack:///./utils/error.ts?");

/***/ }),

/***/ "axios":
/*!************************!*\
  !*** external "axios" ***!
  \************************/
/***/ ((module) => {

module.exports = require("axios");

/***/ }),

/***/ "body-parser":
/*!******************************!*\
  !*** external "body-parser" ***!
  \******************************/
/***/ ((module) => {

module.exports = require("body-parser");

/***/ }),

/***/ "express":
/*!**************************!*\
  !*** external "express" ***!
  \**************************/
/***/ ((module) => {

module.exports = require("express");

/***/ }),

/***/ "mysql2/promise":
/*!*********************************!*\
  !*** external "mysql2/promise" ***!
  \*********************************/
/***/ ((module) => {

module.exports = require("mysql2/promise");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./index.ts");
/******/ 	
/******/ })()
;