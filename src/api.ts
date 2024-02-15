import coinsMockData from "./datas/coins.json";
import coinMockData from "./datas/coin.json";
import coinPriceMockData from "./datas/coinPrice.json";

const PAPRIKA_BASE_URL = "https://api.coinpaprika.com/v1";
const NICO_BASE_URL = "https://ohlcv-api.nomadcoders.workers.dev";

export const fetchCoins = async () => {
  try {
    const response = await fetch(`${PAPRIKA_BASE_URL}/coins`);
    return await response.json();
  } catch (error) {
    // return mock data in case that api is not working because of rate limiter.
    return new Promise((resolve, reject) => resolve(coinsMockData));
  }
};

export const fetchCoinInfoData = async (coinId: string) => {
  try {
    const response = await fetch(`${PAPRIKA_BASE_URL}/coins/${coinId}`);
    return await response.json();
  } catch (error) {
    // return mock data in case that api is not working because of rate limiter.
    return new Promise((resolve, reject) => resolve(coinMockData));
  }
};

export const fetchCoinPriceData = async (coinId: string) => {
  try {
    const response = await fetch(`${PAPRIKA_BASE_URL}/tickers/${coinId}`);
    return await response.json();
  } catch (error) {
    // return mock data in case that api is not working because of rate limiter.
    return new Promise((resolve, reject) => resolve(coinPriceMockData));
  }
};

export const fetchCoinPriceHistory = (coinId: string) => {
  return fetch(`${NICO_BASE_URL}?coinId=${coinId}`).then((response) =>
    response.json()
  );
};
