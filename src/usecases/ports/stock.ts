import { Stock, StockCreate } from "@/domains/stock/dto";

export interface StockAPI {
  createStocks(stocks: StockCreate[]): Promise<void>;

  getStocks(stockCode: string): Promise<Stock[]>;

  getStocksByRandom(): Promise<Stock[]>;

  getStockCodes(): Promise<string[]>;

  saveStockCode(stockCode: string): Promise<void>;
}
