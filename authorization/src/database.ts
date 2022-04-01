import { Collection, Db, MongoClient } from "mongodb";
import { User } from "./models/user";

const uri =
  "mongodb+srv://databaseUser:30eW26OxrGyG47eX@cluster0.byj43.mongodb.net?retryWrites=true&w=majority";

class Database {
  private db: Db;
  private usersCollection: Collection<User>;

  private constructor(client: MongoClient) {
    this.db = client.db("dima_auth_db");
    this.usersCollection = this.db.collection<User>("users")!;
  }

  static init = async (): Promise<Database> => {
    const client = new MongoClient(uri);
    await client.connect();
    return new Database(client);
  };

  get users() {
    return this.usersCollection;
  }
}

export default Database;
