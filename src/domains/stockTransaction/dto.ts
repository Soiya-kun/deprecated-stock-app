export const transactionTypes = [
  "ShortSell",
  "ShortBuy",
  "LongBuy",
  "LongSell",
] as const;
export type TransactionType = typeof transactionTypes[number];

export type UnitTransaction = {
  transactionType: TransactionType;
  date: Date;
  unitValue: number;
  volume: number;
};

export const newUnitTransaction = (): UnitTransaction => ({
  date: new Date(),
  transactionType: "LongBuy",
  unitValue: 0,
  volume: 0,
});

export type Simulation = {
  startingAmount: number; // 初期金額
  tradeTransactions: UnitTransaction[]; // 取引履歴
};

export const newSimulation = (): Simulation => ({
  startingAmount: 0,
  tradeTransactions: [],
});
