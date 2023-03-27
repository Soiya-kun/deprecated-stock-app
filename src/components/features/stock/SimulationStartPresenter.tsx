import { ChangeEvent } from "react";

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
    ) => void;
    validations: Validations<StartingSetting>;
  };
};

export function SimulationStartPresenter({ inputHook }: Props) {
  return (
    <div>
      <p>金額と日付を決めてシミュレーション開始！</p>
      <InputWithTitleAndError
        inputHook={inputHook}
        label="金額"
        name="startingAmount"
      />
      <InputWithTitleAndError
        inputHook={inputHook}
        label="日付"
        name="startingDate"
        type="date"
      />
    </div>
  );
}
