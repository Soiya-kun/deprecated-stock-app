import { ChangeEvent } from "react";

import { ButtonWithError } from "@/components/ui/ButtonWithError";
import { InputWithTitleAndError } from "@/components/ui/InputWithTitleAndError";
import { transactionResult } from "@/domains/stockTransaction/computed";
import {
  Simulation,
  TransactionType,
  UnitTransaction,
} from "@/domains/stockTransaction/dto";

export type SimulationHook = {
  obj: UnitTransaction;
  handleChangeOnInput: (
    e: ChangeEvent<HTMLInputElement>,
    name: keyof UnitTransaction,
  ) => void;
  handleClickOnTradeButton: (type: TransactionType) => void;
};

type Props = {
  simulationHook: SimulationHook;
  simulation: Simulation;
  currentValue: number;
};

export function SimulationPresenter({
  simulationHook,
  simulation,
  currentValue,
}: Props) {
  return (
    <div>
      {simulation.tradeTransactions.map((tradeTransaction) => (
        <div className="flex">
          <p className="mr-4">date: {tradeTransaction.date.toISOString()}</p>
          <p className="mr-4">value: {tradeTransaction.unitValue}</p>
          <p className="mr-4">type: {tradeTransaction.transactionType}</p>
          <p>volume: {tradeTransaction.volume}</p>
        </div>
      ))}
      <p>currentValue: {currentValue}円</p>
      <p>long: {transactionResult(simulation, currentValue)}</p>
      <p>short: {transactionResult(simulation, currentValue)}</p>
      <InputWithTitleAndError
        className="w-full"
        innerClassName="flex items-center"
        inputClassName="w-auto"
        inputHook={simulationHook}
        label="株数"
        name="volume"
        type="number"
      >
        <p className="mx-4 w-max">× 100株</p>
      </InputWithTitleAndError>
      <div className="mt-8 flex space-x-2">
        <ButtonWithError
          variant="primary"
          onClick={() => simulationHook.handleClickOnTradeButton("LongBuy")}
        >
          購入
        </ButtonWithError>
        <ButtonWithError
          variant="primaryOutlined"
          onClick={() => simulationHook.handleClickOnTradeButton("LongSell")}
        >
          売却
        </ButtonWithError>
        <ButtonWithError
          variant="secondary"
          onClick={() => simulationHook.handleClickOnTradeButton("ShortSell")}
        >
          空売
        </ButtonWithError>
        <ButtonWithError
          variant="secondaryOutlined"
          onClick={() => simulationHook.handleClickOnTradeButton("ShortBuy")}
        >
          買戻
        </ButtonWithError>
      </div>
    </div>
  );
}
