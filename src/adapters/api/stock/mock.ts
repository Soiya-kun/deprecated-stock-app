import { Stock } from "@/domains/stock/dto";
import { StockAPI } from "@/usecases/ports/stock";

export const mockBDate = (index: number): string => {
  const date = new Date();
  date.setDate(date.getDate() + index);
  return date.toISOString().slice(0, 10);
};

export const mockStock = (index: number, openPrice: number): Stock => ({
  stockCode: "1234",
  stockName: "ソフトバンク",
  market: "東証一部",
  industry: "mock",
  bDate: mockBDate(index),
  // +-50の範囲にする
  openedPrice: openPrice,
  highPrice: openPrice + 100 + Math.floor(Math.random() * 100 - 50),
  lowPrice: openPrice - 100 + Math.floor(Math.random() * 100 - 50),
  closedPrice: openPrice + Math.floor(Math.random() * 100 - 50),
  volume: 1000 + Math.floor(Math.random() * 100 - 50),
  transactionPrice: 12341234,
  marketCapitalization: 12341234,
  lowLimit: 300,
  highLimit: 800,
});

export const useMockStockAPI = (): StockAPI => ({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async createStocks(stocks: Stock[]): Promise<void> {
    console.log(stocks);
  },
  async getStocks(stockCode: string): Promise<Stock[]> {
    // eslint-disable-next-line no-promise-executor-return
    await new Promise((resolve) => setTimeout(resolve, 1000));
    let prev = 500;
    return Array(1000)
      .fill(0)
      .map((_, i) => {
        const ret = mockStock(i, prev);
        prev = ret.closedPrice;
        return { ...ret, stockCode };
      });
  },
  async getStocksByRandom(): Promise<Stock[]> {
    // eslint-disable-next-line no-promise-executor-return
    await new Promise((resolve) => setTimeout(resolve, 1000));
    let prev = 500;
    return Array(1000)
      .fill(0)
      .map((_, i) => {
        const ret = mockStock(i, prev);
        prev = ret.closedPrice;
        return { ...ret };
      });
  },
  async getStockCodes(): Promise<string[]> {
    return ["0001", "0002", "1301"];
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  saveStockCode(stockCode: string): Promise<void> {
    return Promise.resolve(undefined);
  },
});
