import { Stock } from "@/domains/stock/dto";

export interface StockAPI {
  getStocks(stockCode: string): Promise<Stock[]>;

  getStockCodes(): Promise<string[]>;
}
