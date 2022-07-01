import { Cryptocurrency } from "@/models/cryptocurrency";

import { ArrayElement } from "@/utils/types";

import { CoinsResponse } from "./model";

export const mapCoins = (data: ArrayElement<CoinsResponse['coins']>): Cryptocurrency => ({
    cryptocurrensyName: data.symbol,
    priceUsd: data.price,
    rank: data.rank,
    platformName: 'coinstats',
});
