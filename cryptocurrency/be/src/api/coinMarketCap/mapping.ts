import { CryptocurrencyPlatform } from "@/models/cryptocurrency";

import { ArrayElement } from "@/utils/types";

import { ListingLatestResponse } from "./model";

export const mapListingLatest = (data: ArrayElement<ListingLatestResponse['data']>): CryptocurrencyPlatform => ({
    cryptocurrencyName: data.symbol,
    priceUsd: data.quote['USD'].price,
    rank: data.cmc_rank,
    platformName: 'coinmarketcap',
});
