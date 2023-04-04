import {
  Simulation,
  SimulationResult,
  UnitTransaction,
} from "@/domains/stockTransaction/dto";

export const isShort = (ut: UnitTransaction) =>
  ut.transactionType === "ShortBuy" || ut.transactionType === "ShortSell";

export const isLong = (ut: UnitTransaction) => !isShort(ut);

export const isLongBuy = (ut: UnitTransaction) =>
  ut.transactionType === "LongBuy";

export const isLongSell = (ut: UnitTransaction) =>
  ut.transactionType === "LongSell";

export const isShortBuy = (ut: UnitTransaction) =>
  ut.transactionType === "ShortBuy";

export const isShortSell = (ut: UnitTransaction) =>
  ut.transactionType === "ShortSell";

export const volumeChange = (ut: UnitTransaction) => {
  if (isLongBuy(ut)) return ut.volume;
  if (isLongSell(ut)) return -ut.volume;
  if (isShortSell(ut)) return ut.volume;
  if (isShortBuy(ut)) return -ut.volume;
  return 0;
};

export const transactionResult = (
  simulation: Simulation,
  currentValue: number,
): SimulationResult => {
  const shortPositions = simulation.tradeTransactions.filter((position) =>
    isShort(position),
  );

  const shortPositionVolume = shortPositions.reduce(
    (vol, ut) => vol + ut.volume * (isShortBuy(ut) ? -1 : 1),
    0,
  );

  const shortPosition = shortPositionVolume * currentValue;

  const shortProfit =
    shortPositions.reduce(
      (acc, position) =>
        acc +
        position.unitValue * position.volume * (isShortBuy(position) ? -1 : 1),
      0,
    ) -
    currentValue *
      shortPositions.reduce((acc, position) => acc + volumeChange(position), 0);

  const longPositions = simulation.tradeTransactions.filter((position) =>
    isLong(position),
  );

  const longPositionVolume = longPositions.reduce(
    (vol, ut) => vol + ut.volume * (isLongBuy(ut) ? 1 : -1),
    0,
  );

  const longPosition = longPositionVolume * currentValue;

  const longProfit =
    longPositions.reduce(
      (acc, position) =>
        acc +
        position.unitValue * position.volume * (isLongBuy(position) ? -1 : 1),
      0,
    ) +
    currentValue *
      longPositions.reduce((acc, position) => acc + volumeChange(position), 0);

  return {
    shortPositionVolume,
    longPositionVolume,
    assets: simulation.startingAmount + longProfit + shortProfit,
    cashPosition:
      simulation.startingAmount +
      longProfit +
      shortProfit -
      longPosition -
      shortPosition,
  };
};
