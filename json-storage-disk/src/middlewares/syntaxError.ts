import { ErrorRequestHandler } from "express";

const syntaxErrorMiddleware: ErrorRequestHandler = (error, request, response, next) => {
  if(error.name == 'SyntaxError') {
    response.status(400);
    response.send({
      status: 400,
      message: "Bad Request!"
    });
  }
  next();
};

export default syntaxErrorMiddleware;
