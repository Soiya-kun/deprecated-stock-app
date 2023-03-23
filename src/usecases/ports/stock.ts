import { Stock } from "@/domains/stock";

export interface StockAPI {
  getStocks(stockCode: string): Promise<Stock[]>;
}
