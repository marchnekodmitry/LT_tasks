import path from 'path';
import fs from 'fs';

import { Storage } from './models/storage';
import { DATA_PATH } from './utils/paths';

class StorageCollection {
  constructor() {
  }

  findOne(route: string) {
    try {
      const pathToStorage = path.join(DATA_PATH, route, 'storage.json');
      const file = fs.readFileSync(pathToStorage);
      const json = JSON.parse(file.toString()) as Storage;

      return {
        json,
        route,
      };
    } catch (error) {
      return undefined;
    }
  }

  createOne(storage: Storage) {
    const pathToDir = path.join(DATA_PATH, storage.route);
    const pathToStorage = path.join(pathToDir, 'storage.json');

    if (!fs.existsSync(pathToDir)) {
      fs.mkdirSync(pathToDir, { recursive: true });
    }
    fs.writeFileSync(pathToStorage, JSON.stringify(storage.json));
  }
}

class Database {
  private storageCollection: StorageCollection;

  private constructor() {
    this.storageCollection = new StorageCollection();
  }

  static init = async (): Promise<Database> => {
    return new Database();
  };

  get storages() {
    return this.storageCollection;
  }
}

export default Database;
