import { Stock, StockCreate } from "@/domains/stock/dto";
import { StockSplit } from "@/domains/stockSplit/dto";

export interface StockAPI {
  createStocks(stocks: StockCreate[]): Promise<void>;

  getStocks(stockCode: string): Promise<Stock[]>;

  getStocksByRandom(): Promise<Stock[]>;

  getStockCodes(): Promise<string[]>;

  saveStockCode(stockCode: string): Promise<void>;

  createStockSplit(stockSplit: StockSplit): Promise<void>;
}
