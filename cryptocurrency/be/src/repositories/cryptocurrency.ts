import mysql from 'mysql2/promise';

import { timestampToSQLTimestamp, SQLTimestampToTimestamp } from '@/database/utils/date';
import { CryptocurrencyAggregated } from '@/models/cryptocurrency';

class CryptocurrencyRepository {
    public connection: mysql.Connection;

    constructor(connection: mysql.Connection) {
      this.connection = connection;
    }

    getLatestCryptocurrencies = async (): Promise<Array<CryptocurrencyAggregated>> => {
      const [response] = await this.connection.execute({
        sql: "SELECT * FROM latestCryptocurrencies;",
      });

      const data = response as Array<{
        cryptocurrencyName: string;
        timestamp: Date;
        coinpaprikaValue: number;
        coinstatsValue: number;
        coinmarketcapValue: number;
      }>;

      return data.map((item) => ({
        ...item,
        timestamp: SQLTimestampToTimestamp(item.timestamp),
      }));
    }

    rewriteLatestCryptocurrencies = async (cryptocurrencies: Array<CryptocurrencyAggregated>) => {
      await this.connection.execute("DELETE FROM latestCryptocurrencies;");

      const values = cryptocurrencies.map((
        {
          cryptocurrencyName,
          timestamp,
          coinpaprikaValue,
          coinstatsValue,
          coinmarketcapValue,
        },
      ) => [cryptocurrencyName, timestampToSQLTimestamp(timestamp), coinpaprikaValue, coinstatsValue, coinmarketcapValue]);

      const sql = this.connection.format(
        `INSERT INTO latestCryptocurrencies (cryptocurrencyName, timestamp, coinpaprikaValue, coinstatsValue, coinmarketcapValue) VALUES ?`,
        [values],
      );

      await this.connection.execute(sql);
    }
}

export default CryptocurrencyRepository;
