import { ButtonWithError } from "@/components/ui/ButtonWithError";
import {
  InputHook,
  InputWithTitleAndError,
} from "@/components/ui/InputWithTitleAndError";
import { StockSplit } from "@/domains/stockSplit/dto";

export type StockSplitAddHook = InputHook<StockSplit> & {
  handleClickOnAddButton: () => void;
};

type Props = {
  stockSplitAddHook: StockSplitAddHook;
};

export function StockSplitAddPresenter({ stockSplitAddHook }: Props) {
  return (
    <div className="mx-auto mt-24 max-w-xl">
      <h1>株式分割追加</h1>
      <InputWithTitleAndError
        inputHook={stockSplitAddHook}
        label="SC"
        name="stockCode"
      />
      <InputWithTitleAndError
        inputHook={stockSplitAddHook}
        label="分割日"
        type="date"
        name="date"
      />
      <InputWithTitleAndError
        inputHook={stockSplitAddHook}
        label="分割比率"
        name="splitRatio"
        type="number"
      />
      <ButtonWithError
        className="mt-8"
        variant="primary"
        onClick={stockSplitAddHook.handleClickOnAddButton}
      >
        追加
      </ButtonWithError>
    </div>
  );
}
