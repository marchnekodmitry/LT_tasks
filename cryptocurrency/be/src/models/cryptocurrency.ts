export type CryptocurrencyPlatform = {
    cryptocurrencyName: string;
    priceUsd: number;
    rank: number;
    platformName: string;
}

export type CryptocurrencyAggregated = {
    cryptocurrencyName: string;
    timestamp: number;
    coinpaprikaValue: number;
    coinstatsValue: number;
    coinmarketcapValue: number;
  }