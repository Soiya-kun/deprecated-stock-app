import { ChangeEvent } from "react";

import { TransactionResultPresenter } from "@/components/features/stock/TransactionResultPresenter";
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
  className?: string;
  currentValue: number;
  simulationHook: SimulationHookType;
  simulation: Simulation;
};

export function SimulationPresenter({
  className,
  currentValue,
  simulationHook,
  simulation,
}: Props) {
  return (
    <div className={className}>
      <TransactionTablePresenter
        className="h-48 overflow-y-scroll"
        transactions={simulation.tradeTransactions}
      />
      <TransactionResultPresenter
        className="mt-4 text-lg"
        currentValue={currentValue}
        simulation={simulation}
      />
      <div className="flex w-full">
        <TextAreaWithTitleAndError
          className="mr-4 w-1/2"
          textAreaClassName="h-48"
          textAreaHook={simulationHook}
          label="メモ"
          name="memo"
        />
        <div className="w-1/2">
          <InputWithTitleAndError
            innerClassName="flex items-center"
            inputClassName="w-24"
            inputHook={simulationHook}
            label="株数"
            name="volume"
            type="number"
          >
            <p className="ml-4 w-max">× 100株</p>
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
              onClick={() =>
                simulationHook.handleClickOnTradeButton("LongSell")
              }
            >
              売却
            </ButtonWithError>
            <ButtonWithError
              variant="secondary"
              onClick={() =>
                simulationHook.handleClickOnTradeButton("ShortSell")
              }
            >
              空売
            </ButtonWithError>
            <ButtonWithError
              variant="secondaryOutlined"
              onClick={() =>
                simulationHook.handleClickOnTradeButton("ShortBuy")
              }
            >
              買戻
            </ButtonWithError>
          </div>
        </div>
      </div>
    </div>
  );
}
