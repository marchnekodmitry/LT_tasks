import { Cryptocurrency } from "@/models/cryptocurrency";

import { ArrayElement } from "@/utils/types";

import { TickersResponse } from "./model";

export const mapTickers = (data: ArrayElement<TickersResponse>): Cryptocurrency => ({
    cryptocurrensyName: data.symbol,
    priceUsd: data.quotes.USD.price,
    rank: data.rank,
    platformName: 'coinpaprika',
});
