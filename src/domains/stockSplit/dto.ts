export type StockSplit = {
  stockCode: string;
  date: Date;
  splitRatio: number;
};

export const newStockSplit = (): StockSplit => ({
  date: new Date(),
  splitRatio: 0,
  stockCode: "",
});
