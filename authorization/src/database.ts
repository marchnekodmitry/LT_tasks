import { Db, MongoClient } from 'mongodb';

const uri =
  "mongodb+srv://databaseUser:30eW26OxrGyG47eX@cluster0.byj43.mongodb.net?retryWrites=true&w=majority";

class Database {
  private userDB: Db | null = null;
  private client: MongoClient;

  constructor() {
    this.client = new MongoClient(uri);

    const connect = async () => {
      await this.client.connect();

      this.userDB = this.client.db('user');
    };

    connect();
  }

  get user() {
    return this.userDB!;
  }
}

const DB = new Database();

export default DB;
