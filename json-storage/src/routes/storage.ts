import { Collection } from 'mongodb';
import express, { NextFunction, Request, Response, Router } from 'express';

import APIError from '@/utils/error';
import { formatPath } from '@/utils/formatPath';

import { Storage } from '@/models/storage';

import Database from '@/database';

const storageRouter = express.Router();

class StorageController {
  public router: Router;
  public storages: Collection<Storage>;

  constructor(db: Database) {
    this.storages = db.storages;

    this.router = express.Router();
    this.router.post("/*", this.createStorage);
    this.router.get("/*", this.getStorage);
  }

  createStorage = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const path = formatPath(req.path);
      const payload = req.body;
  
      const storage = await this.storages.findOne({ route: path });
  
      if (storage) {
        throw new APIError(409, 'Route already exists');
      }
  
      this.storages.insertOne({ route: path, json: payload });
  
      res.sendStatus(200);
    } catch (error) {
      next(error);
    }
  }

  getStorage = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const path = formatPath(req.path);
  
      const storage = await this.storages.findOne<Storage>({ route: path });
  
      if (!storage) {
        throw new APIError(404, 'Route doesn\'t exist');
      }
  
      res.status(200).json(storage.json);
      // res.status(200).json({ ok: true });
    } catch (error) {
      next(error);
    }
  }
}

export default StorageController;
