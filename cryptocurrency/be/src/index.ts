import express from 'express';
import bodyParser from 'body-parser';

import CryptocurrencyController from '@/routes/cryptocurrency';

import errorMiddleware from './middlewares/error';
import syntaxErrorMiddleware from './middlewares/syntaxError';
import Database from './database';

const app = express();

const PORT = 3103;

const main = async () => {
  const db = await Database.init();
  const cc = new CryptocurrencyController(db)

  app.use(bodyParser.json({
    limit: '100kb',
    type: '*/*'
  }));
  app.use(syntaxErrorMiddleware);

  app.use(cc.router);

  app.use(errorMiddleware);

  app.listen(PORT, () => {
    console.log(`App listening at http://localhost:${PORT}`);
  });
};

main();
