class Database {
  private constructor() {

  }

  static init = async (): Promise<Database> => {
    return new Database();
  };
}

export default Database;
