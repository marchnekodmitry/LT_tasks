import axios from "axios";

import { mapTickers } from "./mapping";
import { TickersResponse } from "./model";

export const tickers = async () => {
    const response = await axios.get<TickersResponse>('https://api.coinpaprika.com/v1/tickers');

    return response.data.map(mapTickers);
};
