import { CryptocurrencyPlatform } from "@/models/cryptocurrency";

import { ArrayElement } from "@/utils/types";

import { CoinsResponse } from "./model";

export const mapCoins = (data: ArrayElement<CoinsResponse['coins']>): CryptocurrencyPlatform => ({
    cryptocurrencyName: data.symbol,
    priceUsd: data.price,
    rank: data.rank,
    platformName: 'coinstats',
});
