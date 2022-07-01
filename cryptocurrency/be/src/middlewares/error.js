"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const error_1 = __importDefault(require("@/utils/error"));
const errorMiddleware = (error, request, response, next) => {
    if (error instanceof error_1.default) {
        response.status(error.status).send({
            error: {
                message: error.message,
            },
        });
        return;
    }
    if (error instanceof Error) {
        response.status(500).send({
            error: {
                message: error.message,
            },
        });
        return;
    }
    response.status(500).send({
        error: {
            message: 'Internal Server Error',
        },
    });
};
exports.default = errorMiddleware;
