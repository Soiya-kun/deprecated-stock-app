import { Simulation, UnitTransaction } from "@/domains/stockTransaction/dto";

export const isShort = (ut: UnitTransaction) =>
  ut.transactionType === "ShortBuy" || ut.transactionType === "ShortSell";

export const isLong = (ut: UnitTransaction) => !isShort(ut);

export const isBuy = (ut: UnitTransaction) =>
  ut.transactionType === "ShortBuy" || ut.transactionType === "LongBuy";

export const transactionResult = (
  simulation: Simulation,
  currentValue: number,
  type: "short" | "long",
): number => {
  const shortPositions = simulation.tradeTransactions.filter((position) =>
    isShort(position),
  );
  const shortPositionsValue = shortPositions.reduce(
    (acc, position) =>
      acc +
      position.unitValue *
        position.volume *
        (isBuy(position) ? -1 : 1) *
        (type === "short" ? -1 : 1),
    0,
  );
  const remainingShortPositions = shortPositions.reduce(
    (acc, position) => acc + (isBuy(position) ? -1 : 1) * position.volume,
    0,
  );
  return shortPositionsValue + remainingShortPositions * currentValue;
};
