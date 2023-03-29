import { ChangeEvent } from "react";

import { ButtonWithError } from "@/components/ui/ButtonWithError";
import { InputWithTitleAndError } from "@/components/ui/InputWithTitleAndError";
import { UnitTransaction } from "@/domains/stockTransaction/dto";

export type SimulationHook = {
  obj: UnitTransaction;
  handleChangeOnInput: (
    e: ChangeEvent<HTMLInputElement>,
    name: keyof UnitTransaction,
  ) => void;
  handleClickOnBuyButton: () => void;
};

type Props = {
  simulationHook: SimulationHook;
};

export function SimulationPresenter({ simulationHook }: Props) {
  return (
    <div>
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
      <ButtonWithError
        variant="primary"
        className="mx-auto mt-8"
        onClick={simulationHook.handleClickOnBuyButton}
      >
        購入
      </ButtonWithError>
    </div>
  );
}
