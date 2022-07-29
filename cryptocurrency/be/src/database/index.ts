import mysql from 'mysql2/promise';

import CryptocurrencyRepository from '../repositories/cryptocurrency';

class Database {
  public connection: mysql.Connection;

  private constructor(connection: mysql.Connection) {
    this.connection = connection;
  }

  static init = async (): Promise<Database> => {
    const connection = await mysql.createConnection({
      host: '127.0.0.1',
      user: 'root',
      password: 'Dmarchenko1@',
      database: 'cryptocurrency',
    });

    console.log('Database connected');

    return new Database(connection);
  };
}

export default Database;
