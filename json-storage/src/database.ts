import { Collection, Db, MongoClient } from "mongodb";
import { Storage } from './models/storage';

const uri =
  "mongodb+srv://jsonStorageUser:Doa4MtmjUk6aIOdy@storagecluster.pkj9p.mongodb.net/?retryWrites=true&w=majority";

class Database {
  private db: Db;
  private storageCollection: Collection<Storage>;

  private constructor(client: MongoClient) {
    this.db = client.db('json-storage');
    this.storageCollection = this.db.collection<Storage>('storages')!;
  }

  static init = async (): Promise<Database> => {
    const client = new MongoClient(uri);
    try {
      await client.connect();
    } catch (error) {
      console.error(error);
    }
    return new Database(client);
  };

  get storages() {
    return this.storageCollection;
  }
}

export default Database;
