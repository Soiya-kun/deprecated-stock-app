import axios from "axios";

import {
  createReqFromDto,
  entityFromStockRes,
  StockRes,
} from "@/adapters/api/stock/schema";
import { Stock, StockCreate } from "@/domains/stock/dto";
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
    const res = await axios.get<{ stockCodes: string[] }>(`${uri}/stock-codes`);
    return res.data.stockCodes;
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async saveStockCode(stockCode: string): Promise<void> {
    return Promise.resolve(undefined);
  },
});
