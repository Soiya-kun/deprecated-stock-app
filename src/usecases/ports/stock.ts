import { Stock } from "@/domains/stock/dto";

export interface StockAPI {
  getStocks(stockCode: string): Promise<Stock[]>;

  getStocksByRandom(): Promise<Stock[]>;

  getStockCodes(): Promise<string[]>;

  saveStockCode(stockCode: string): Promise<void>;
}
