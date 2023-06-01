import { ChangeEvent } from "react";

import { TransactionResultPresenter } from "@/components/features/stock/TransactionResultPresenter";
import { TransactionTablePresenter } from "@/components/features/stock/TransactionTablePresenter";
import { useAuthContext } from "@/components/functionals/AuthContextProvider";
import { ButtonWithError } from "@/components/ui/ButtonWithError";
import { InputWithTitleAndError } from "@/components/ui/InputWithTitleAndError";
import { TextAreaWithTitleAndError } from "@/components/ui/TextAreaWithTitleAndError";
import {
  Simulation,
  SimulationResult,
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
  isToSave: boolean;
  simulationResult: SimulationResult;
  simulationHook: SimulationHookType;
  simulation: Simulation;
};

export function SimulationActionPresenter({
  className,
  isToSave,
  simulationResult,
  simulationHook,
  simulation,
}: Props) {
  const auth = useAuthContext();
  return (
    <div className={className}>
      <TransactionResultPresenter
        className="text-lg"
        simulationResult={simulationResult}
      />
      <TransactionTablePresenter
        className="mt-4 h-48 w-full overflow-x-auto overflow-y-auto"
        transactions={simulation.tradeTransactions}
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
          {auth.auth.isLoggedIn && isToSave && (
            <ButtonWithError className="mt-8 w-full" variant="secondary">
              保存
            </ButtonWithError>
          )}
          {auth.auth.isLoggedIn && isToSave && (
            <ButtonWithError
              className="mt-8 w-full"
              variant="secondaryOutlined"
            >
              削除
            </ButtonWithError>
          )}
        </div>
      </div>
    </div>
  );
}
