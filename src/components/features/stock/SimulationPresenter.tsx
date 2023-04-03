import { ChangeEvent } from "react";

import { TransactionTablePresenter } from "@/components/features/stock/TransactionTablePresenter";
import { ButtonWithError } from "@/components/ui/ButtonWithError";
import { InputWithTitleAndError } from "@/components/ui/InputWithTitleAndError";
import { TextAreaWithTitleAndError } from "@/components/ui/TextAreaWithTitleAndError";
import {
  Simulation,
  TransactionType,
  UnitTransaction,
} from "@/domains/stockTransaction/dto";

export type SimulationHookType = {
  obj: UnitTransaction;
  handleChangeOnInput: (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    name: keyof UnitTransaction,
  ) => void;
  handleClickOnTradeButton: (type: TransactionType) => void;
};

type Props = {
  simulationHook: SimulationHookType;
  simulation: Simulation;
};

export function SimulationPresenter({ simulationHook, simulation }: Props) {
  return (
    <div>
      <TransactionTablePresenter transactions={simulation.tradeTransactions} />
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
      <TextAreaWithTitleAndError
        textAreaHook={simulationHook}
        label="メモ"
        name="memo"
      />
    </div>
  );
}
