import { ChangeEvent, HTMLInputTypeAttribute } from "react";

import { ButtonWithError } from "@/components/ui/ButtonWithError";
import { InputWithTitleAndError } from "@/components/ui/InputWithTitleAndError";
import { Validations } from "@/domains/validationObject";

export type StartingSetting = {
  startingAmount: number; // 開始金額
  startingDate: Date; // 開始日
};

export const newStartingSetting = (): StartingSetting => ({
  startingAmount: 0,
  startingDate: new Date(),
});

type Props = {
  inputHook: {
    obj: StartingSetting;
    handleChangeOnInput: (
      e: ChangeEvent<HTMLInputElement>,
      name: keyof StartingSetting,
      type?: HTMLInputTypeAttribute,
    ) => void;
    validations: Validations<StartingSetting>;
  };
};

export function SimulationStartPresenter({ inputHook }: Props) {
  return (
    <div className="flex flex-col justify-center">
      <p>金額と日付を決めてシミュレーション開始！</p>
      <InputWithTitleAndError
        innerClassName="flex items-center"
        inputHook={inputHook}
        label="金額"
        name="startingAmount"
        type="number"
      >
        <p className="mx-4">円</p>
      </InputWithTitleAndError>
      <InputWithTitleAndError
        inputHook={inputHook}
        label="日付"
        name="startingDate"
        type="date"
      />
      <ButtonWithError variant="primary" className="mx-auto mt-8">
        シミュレーション開始
      </ButtonWithError>
    </div>
  );
}
