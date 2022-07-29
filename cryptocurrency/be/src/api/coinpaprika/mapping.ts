import { CryptocurrencyPlatform } from "@/models/cryptocurrency";

import { ArrayElement } from "@/utils/types";

import { TickersResponse } from "./model";

export const mapTickers = (data: ArrayElement<TickersResponse>): CryptocurrencyPlatform => ({
    cryptocurrencyName: data.symbol,
    priceUsd: data.quotes.USD.price,
    rank: data.rank,
    platformName: 'coinpaprika',
});
