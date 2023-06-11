import { Stock, StockCreate } from "@/domains/stock/dto";

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

export type StockCreateReq = {
  stockCode: string;
  stockName: string;
  market: string;
  industry: string;
  date: Date;
  price: number;
  change: number;
  changePercent: number;
  previousClose: number;
  open: number;
  high: number;
  low: number;
  volume: number;
  tradingValue: number;
  marketCap: number;
  lowerLimit: number;
  upperLimit: number;
};

export const createReqFromDto = (stock: StockCreate): StockCreateReq => ({
  change: stock.change,
  changePercent: stock.changePercent,
  date: stock.bDateCreate,
  high: stock.highPrice,
  industry: stock.industry,
  low: stock.lowPrice,
  lowerLimit: stock.lowLimit,
  market: stock.market,
  marketCap: stock.marketCapitalization,
  open: stock.openedPrice,
  previousClose: stock.previousClose,
  price: stock.closedPrice,
  stockCode: stock.stockCode,
  stockName: stock.stockName,
  tradingValue: stock.transactionPrice,
  upperLimit: stock.highLimit,
  volume: stock.volume,
});
