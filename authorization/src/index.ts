import express from 'express';
import bodyParser from 'body-parser';

import userRouter from '@/routes/user';

import errorMiddleware from '@/middlewares/error';

const app = express();

const PORT = 3100;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(userRouter);

app.use(errorMiddleware);

app.listen(PORT, () => {
  console.log(`App listening at http://localhost:${PORT}`)
});
