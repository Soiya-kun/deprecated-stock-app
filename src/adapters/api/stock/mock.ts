import { Stock } from "@/domains/stock/dto";

export const mockBDate = (index: number): string => {
  const date = new Date();
  date.setDate(date.getDate() + index);
  return date.toISOString().slice(0, 10);
};

export const mockStock = (index: number): Stock => ({
  sc: "1234",
  name: "mock",
  market: "mock",
  industry: "mock",
  bDate: mockBDate(index),
  // +-50の範囲にする
  openedPrice: 600 + Math.floor(Math.random() * 100 - 50),
  highPrice: 700 + Math.floor(Math.random() * 100 - 50),
  lowPrice: 400 + Math.floor(Math.random() * 100 - 50),
  closedPrice: 500 + Math.floor(Math.random() * 100 - 50),
  volume: 1000 + Math.floor(Math.random() * 100 - 50),
  transactionPrice: 12341234,
  marketCapitalization: 12341234,
  lowLimit: 300,
  highLimit: 800,
});
