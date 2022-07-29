import express, { NextFunction, Request, Response, Router } from 'express';

import Database from '@/database';

import CryptocurrencyRepository from '@/repositories/cryptocurrency';

import { listingsLatest } from '@/api/coinMarketCap/api';
import { tickers } from '@/api/coinpaprika/api';
import { coins } from '@/api/coinstats/api';

import { CryptocurrencyAggregated } from '@/models/cryptocurrency';

class CryptocurrencyController {
  public router: Router;

  private cryptocurrencyRepository: CryptocurrencyRepository;

  constructor(db: Database) {
    this.cryptocurrencyRepository = new CryptocurrencyRepository(db.connection);
    this.router = express.Router();
    this.router.get("/latestCryptocurrencies", this.latestCryptocurrencies);
  }

  latestCryptocurrencies = async (req: Request, res: Response, next: NextFunction) => {
    const response = await this.cryptocurrencyRepository.getLatestCryptocurrencies();

    res.status(200).json(response);
  }

  updateCryptocurrencies = async () => {
    const cryptocurrencies = await this.getCryptocurrencies();

    await this.cryptocurrencyRepository.rewriteLatestCryptocurrencies(cryptocurrencies);
  }

  getCryptocurrencies = async (): Promise<Array<CryptocurrencyAggregated>> => {
    const responseCMC = await listingsLatest();
    const responseCP = await tickers();
    const responseCS = await coins();

    const timestamp = Date.now();

    const marketsData = [responseCMC, responseCP, responseCS];

    const map = new Map<string, {
      cryptocurrencyName: string;
      markets: number;
      rank: number;
      price: Record<string, number>;
    }>();

    marketsData.forEach((marketData) => {
      marketData.forEach(({ cryptocurrencyName, rank, priceUsd, platformName }) => {
        const item = map.get(cryptocurrencyName);

        if (!item) {
          map.set(cryptocurrencyName, {
            cryptocurrencyName,
            markets: 1,
            rank,
            price: {
              [platformName]: priceUsd,
            },
          });
        } else {
          if (item.price[platformName]) return;

          map.set(cryptocurrencyName, {
            cryptocurrencyName,
            markets: item.markets + 1,
            rank: item.rank + rank,
            price: {
              ...item.price,
              [platformName]: priceUsd,
            },
          });
        }
      });
    });

    const topCryptocurrencies = Array.from(map.values()).sort((data1, data2) => {
      if (data1.markets !== data2.markets) return data2.markets - data1.markets;

      return data1.rank - data2.rank;
    }).slice(0, 20);

    return topCryptocurrencies.map((item) => ({
      cryptocurrencyName: item.cryptocurrencyName,
      timestamp,
      coinpaprikaValue: item.price.coinpaprika,
      coinstatsValue: item.price.coinstats,
      coinmarketcapValue: item.price.coinmarketcap,
    }));
  }
}

export default CryptocurrencyController;
