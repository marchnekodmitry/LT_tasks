import express, { NextFunction, Request, Response, Router } from 'express';

import Database from '@/database';

import { listingsLatest } from '@/services/coinMarketCap/api';
import { tickers } from '@/services/coinpaprika/api';
import { coins } from '@/services/coinstats/api';

class CryptocurrencyController {
  public router: Router;

  constructor(db: Database) {
    this.router = express.Router();
    this.router.get("/crypto", this.getCryptocurrencies);
  }

  getCryptocurrencies = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const responseCMC = await listingsLatest();
      const responseCP = await tickers();
      const responseCS = await coins();

      const marketsData = [responseCMC, responseCP, responseCS];

      const map = new Map();

      marketsData.forEach((marketData) => {
        marketData.forEach(({ cryptocurrensyName, rank, priceUsd, platformName }) => {
          const item = map.get(cryptocurrensyName);

          if (!item) {
            map.set(cryptocurrensyName, {
              markets: 1,
              rank,
              price: {
                [platformName]: priceUsd,
              },
            });
          } else {
            if (item.price[platformName]) return;

            map.set(cryptocurrensyName, {
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

      const topCryptocurrencies = Array.from(map.entries()).sort(([cryptocurrensyName1, data1], [cryptocurrensyName2, data2]) => {
        if (data1.markets !== data2.markets) return data2.markets - data1.markets;

        return data1.rank - data2.rank;
      }).slice(0, 20);

      res.status(200).json({
        top: topCryptocurrencies,
      });
    } catch (error) {
      next(error);
    }
  }
}

/**
 * 
 * {
 *  1: {
 *      markets: 1,
 *      rank: 1,
 *      price: {
 *        [marketName]: price,
 *      }
 *  },
 *  ....
 * 
 * }
 * 
 * sort markets >, rank <
 * 
 */

// 1 2 3 4 5 6 7
// 2 3 4 5 9 10 7
// ...     2   ...

// 2 3 4 5 7

export default CryptocurrencyController;
