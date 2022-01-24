import { ErrorRequestHandler } from "express";

import APIError from "@/utils/error";

const errorMiddleware: ErrorRequestHandler = (err, req, res, next) => {
  if (err instanceof APIError) {
    res.status(err.status).send({
      error: {
        message: err.message,
      },
    });

    return;
  }

  if (err instanceof Error) {
    res.status(500).send({
      error: {
        message: err.message,
      },
    });

    return;
  }

  res.status(500).send({
    error: {
      message: 'Internal Server Error',
    },
  });
};

export default errorMiddleware;
