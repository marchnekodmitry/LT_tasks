import express, { NextFunction, Request, Response, Router } from 'express';

import APIError from '@/utils/error';
import { formatPath } from '@/utils/formatPath';

import { Storage } from '@/models/storage';
import Database from '@/database';

class StorageController {
  public router: Router;
  private db: Database;

  constructor(db: Database) {
    this.router = express.Router();
    this.router.post("/*", this.createStorage);
    this.router.get("/*", this.getStorage);
    this.db = db;
  }

  createStorage = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const path = formatPath(req.path);
      const payload = req.body;
  
      const storage = this.db.storages.findOne(path);

      if (storage) {
        throw new APIError(409, 'Route already exists');
      }
  
      this.db.storages.createOne({ route: path, json: payload });
  
      res.sendStatus(200);
    } catch (error) {
      next(error);
    }
  }

  getStorage = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const path = formatPath(req.path);

      const storage = this.db.storages.findOne(path);
  
      if (!storage) {
        throw new APIError(404, 'Route doesn\'t exist');
      }
  
      res.status(200).json(storage.json);
    } catch (error) {
      next(error);
    }
  }
}

export default StorageController;
