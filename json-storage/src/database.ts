import { Db, MongoClient } from 'mongodb';

const uri =
  "mongodb+srv://jsonStorageUser:BQZ1fNUN9B6gkRiu@storagecluster.pkj9p.mongodb.net?retryWrites=true&w=majority";

class Database {
  private jsonStorageDb: Db | null = null;
  private client: MongoClient;

  constructor() {
    this.client = new MongoClient(uri);

    const connect = async () => {
      await this.client.connect();

      this.jsonStorageDb = this.client.db('json-storage');
    };

    connect();
  }

  get jsonStorage() {
    return this.jsonStorageDb!;
  }
}

const DB = new Database();

export default DB;
