import fs from 'fs';
import path from 'path';
import { URL } from 'url';

import express from 'express';

import DB from '@/database';

import APIError from '@/utils/error';

import { Storage } from '@/models/storage';

const storageRouter = express.Router();

storageRouter.post('/*', async (req, res, next) => {
  try {
    const fullUrl = new URL(req.url, `http://${req.headers.host}`);

    const path = fullUrl.pathname;
    const payload = req.body;

    const storageCollection = DB.jsonStorage.collection('storages');

    const storage = await storageCollection.findOne({ route: path });

    if (storage) {
      throw new APIError(409, 'Route already exists');
    }

    storageCollection.insertOne({ route: path, json: payload });

    res.sendStatus(200);
  } catch (error) {
    next(error);
  }
});

storageRouter.get('/*', async (req, res, next) => {
  try {
    const fullUrl = new URL(req.url, `http://${req.headers.host}`);

    const path = fullUrl.pathname;

    const storageCollection = DB.jsonStorage.collection('storages');

    const storage = await storageCollection.findOne<Storage>({ route: path });

    if (!storage) {
      throw new APIError(404, 'Route doesn\'t exist');
    }

    res.status(200).json(storage.json);
  } catch (error) {
    next(error);
  }
});

export default storageRouter;
