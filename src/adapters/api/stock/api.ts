import axios from "axios";

import { entityFromStockRes, StockRes } from "@/adapters/api/stock/schema";
import { Stock } from "@/domains/stock/dto";
import { StockAPI } from "@/usecases/ports/stock";

const uri = "stocks";

export const useStockAPI = (): StockAPI => ({
  async getStocks(stockCode: string): Promise<Stock[]> {
    const res = await axios.get<StockRes[]>(`${uri}/${stockCode}`);
    return res.data.map((stock) => entityFromStockRes(stock));
  },
  async getStocksByRandom(): Promise<Stock[]> {
    const res = await axios.get<StockRes[]>(`${uri}/random`);
    return res.data.map((stock) => entityFromStockRes(stock));
  },
  async getStockCodes(): Promise<string[]> {
    return ["0001", "0002", "1301"];
  },
});
