"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const syntaxErrorMiddleware = (error, request, response, next) => {
    if (error.name == 'SyntaxError') {
        response.status(400);
        response.send({
            status: 400,
            message: "Bad Request!"
        });
    }
    next();
};
exports.default = syntaxErrorMiddleware;
