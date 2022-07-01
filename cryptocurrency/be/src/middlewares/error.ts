import { ErrorRequestHandler } from "express";

import APIError from "@/utils/error";

const errorMiddleware: ErrorRequestHandler = (error, request, response, next) => {
  if (error instanceof APIError) {
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

export default errorMiddleware;
