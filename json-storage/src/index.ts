import express from 'express';
import bodyParser from 'body-parser';

import storageRouter from '@/routes/storage';

import errorMiddleware from './middlewares/error';
import syntaxErrorMiddleware from './middlewares/syntaxError';

const app = express();

const PORT = 3100;

app.use(bodyParser.json({
  limit: '100kb',
  type: '*/*'
}));

app.use(syntaxErrorMiddleware);

app.use(storageRouter);

app.use(errorMiddleware);

app.listen(PORT, () => {
  console.log(`App listening at http://localhost:${PORT}`)
});
