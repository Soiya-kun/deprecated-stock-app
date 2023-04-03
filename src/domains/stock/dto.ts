export type Stock = {
  sc: string;
  name: string;
  market: string;
  industry: string;
  bDate: string;
  openedPrice: number;
  highPrice: number;
  lowPrice: number;
  closedPrice: number;
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
