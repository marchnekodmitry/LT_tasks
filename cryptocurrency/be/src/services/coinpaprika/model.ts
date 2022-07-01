type Quote = {
  "price": number;
  "volume_24h": number;
  "volume_24h_change_24h": number;
  "market_cap": number;
  "market_cap_change_24h": number;
  "percent_change_15m": number;
  "percent_change_30m": number;
  "percent_change_1h": number;
  "percent_change_6h": number;
  "percent_change_12h": number;
  "percent_change_24h": number;
  "percent_change_7d": number;
  "percent_change_30d": number;
  "percent_change_1y": number;
  "ath_price": null;
  "ath_date": null;
  "percent_from_price_ath": null;
};

export type TickersResponse = Array<{
  "id": string;
  "name": string;
  "symbol": string;
  "rank": number;
  "circulating_supply": number;
  "total_supply": number;
  "max_supply": number;
  "beta_value": number;
  "first_data_at": string;
  "last_updated": string;
  "quotes": {
    "BTC": Quote;
    "USD": Quote;
  };
}>;
