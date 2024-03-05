import axios from "axios";

import {
  createReqFromDto,
  entityFromStockRes,
  StockRes,
} from "@/adapters/api/stock/schema";
import { Stock, StockCreate } from "@/domains/stock/dto";
import { StockSearchPattern } from "@/domains/stockSearch/dto";
import { StockSplit } from "@/domains/stockSplit/dto";
import { StockAPI } from "@/usecases/ports/stock";

const uri = "stocks";

export const useStockAPI = (): StockAPI => ({
  async createStocks(stocks: StockCreate[]): Promise<void> {
    await axios.post<{ stocks: StockRes[] }>(`${uri}`, {
      stocks: stocks.map(createReqFromDto),
    });
  },
  async getStocks(stockCode: string): Promise<Stock[]> {
    const res = await axios.get<StockRes[]>(`${uri}/${stockCode}`);
    return res.data.map((stock) => entityFromStockRes(stock));
  },
  async getStocksByRandom(): Promise<Stock[]> {
    const res = await axios.get<StockRes[]>(`${uri}/random`);
    return res.data.map((stock) => entityFromStockRes(stock));
  },
  async getStockCodes(): Promise<string[]> {
    // const res = await axios.get<{ stockCodes: string[] }>(`${uri}/stock-codes`);
    const res = await axios.post<{ stockCodes: string[] }>(
      `${uri}/stock-codes/threshold`,
      {
        minTradeValue: 5000000,
        date: new Date(),
      },
    );
    return res.data.stockCodes;
  },
  async getStockCodesSaved(): Promise<string[]> {
    const res = await axios.get<{ stockCodes: string[] }>(
      `${uri}/my-stock-codes`,
    );
    return res.data.stockCodes;
  },
  async saveStockCode(stockCode: string): Promise<void> {
    await axios.post(`${uri}/stock-codes`, { stockCode });
  },
  createStockSplit(stockSplit: StockSplit): Promise<void> {
    return axios.post(`${uri}/stock-splits`, stockSplit);
  },
  async saveSearchStockPattern(
    stockSearchPattern: StockSearchPattern,
  ): Promise<void> {
    await axios.post(`${uri}/save-search-stock-patterns`, stockSearchPattern);
  },
});
