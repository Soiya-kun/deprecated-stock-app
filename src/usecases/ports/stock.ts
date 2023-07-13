import { Stock, StockCreate } from "@/domains/stock/dto";
import { StockSearchPattern } from "@/domains/stockSearch/dto";
import { StockSplit } from "@/domains/stockSplit/dto";

export interface StockAPI {
  createStocks(stocks: StockCreate[]): Promise<void>;

  createStockSplit(stockSplit: StockSplit): Promise<void>;

  getStocks(stockCode: string): Promise<Stock[]>;

  getStockCodes(): Promise<string[]>;

  getStocksByRandom(): Promise<Stock[]>;

  saveStockCode(stockCode: string): Promise<void>;

  saveSearchStockPattern(stockSearchPattern: StockSearchPattern): Promise<void>;
}
