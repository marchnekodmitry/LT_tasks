import express from 'express';
import bodyParser from 'body-parser';

import StorageController from '@/routes/storage';

import errorMiddleware from './middlewares/error';
import syntaxErrorMiddleware from './middlewares/syntaxError';
import Database from './database';

const app = express();

const PORT = 3100;

const main = async () => {
  const db = await Database.init();
  const sc = new StorageController(db);

  app.use(bodyParser.json({
    limit: '100kb',
    type: '*/*'
  }));
  app.use(syntaxErrorMiddleware);

  app.use(sc.router);

  app.use(errorMiddleware);
  app.listen(PORT, () => {
    console.log(`App listening at http://localhost:${PORT}`);
  });
};

main();
