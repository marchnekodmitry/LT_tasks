import axios from "axios";

import { mapListingLatest } from "./mapping";
import { ListingLatestResponse } from './model';

export const listingsLatest = async () => {
    const response = await axios.get<ListingLatestResponse>('https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest', {
        headers: {
            'X-CMC_PRO_API_KEY': process.env.COIN_MARKET_CUP_KEY!,
        },
    });

    return response.data.data.map(mapListingLatest);
};
