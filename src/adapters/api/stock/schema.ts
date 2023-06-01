import { Stock } from "@/domains/stock/dto";

export type StockRes = {
  stockCode: string;
  stockName: string;
  market: string;
  industry: string;
  date: string;
  closedPrice: number;
  openedPrice: number;
  highPrice: number;
  lowPrice: number;
  volume: number;
  transactionPrice: number;
  marketCapitalization: number;
  lowLimit: number;
  highLimit: number;
};

export const entityFromStockRes = (res: StockRes): Stock => ({
  bDate: res.date,
  closedPrice: res.closedPrice,
  highLimit: res.highLimit,
  highPrice: res.highPrice,
  industry: res.industry,
  lowLimit: res.lowLimit,
  lowPrice: res.lowPrice,
  market: res.market,
  marketCapitalization: res.marketCapitalization,
  openedPrice: res.openedPrice,
  stockCode: res.stockCode,
  stockName: res.stockName,
  transactionPrice: res.transactionPrice,
  volume: res.volume,
});
