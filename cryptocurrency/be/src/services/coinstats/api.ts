import axios from "axios";

import { mapCoins } from "./mapping";
import { CoinsResponse } from "./model";

export const coins = async () => {
    const response = await axios.get<CoinsResponse>('https://api.coinstats.app/public/v1/coins?currency=USD');

    return response.data.coins.map(mapCoins);
};
