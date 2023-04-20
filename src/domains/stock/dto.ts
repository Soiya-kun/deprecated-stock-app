export type Stock = {
  stockCode: string;
  stockName: string;
  market: string;
  industry: string;
  bDate: string;
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

export type StockInfo = {
  sc: string;
  name: string;
  market: string;
  industry: string;
  closedPrice: number;
  diffFromYesterday: number;
  diffFromYesterdayPercent: number;
};
