import { ChangeEvent } from "react";

import { ButtonWithError } from "@/components/ui/ButtonWithError";
import { InputFileButton } from "@/components/ui/InputFileButton";
import { StockCreate } from "@/domains/stock/dto";

type Props = {
  handleChangeOnInputFile: (e: ChangeEvent<HTMLInputElement>) => void;
  stocksCreate: StockCreate[];
  handleClickOnCreate: () => void;
};

export function StockAddPresenter({
  handleChangeOnInputFile,
  stocksCreate,
  handleClickOnCreate,
}: Props) {
  return (
    <div>
      <InputFileButton onChange={handleChangeOnInputFile} />
      <ButtonWithError variant="primary" onClick={handleClickOnCreate}>
        登録
      </ButtonWithError>
      {stocksCreate.map((stockCreate) => (
        <div className="flex" key={stockCreate.stockCode}>
          <p>{stockCreate.stockCode}</p>
        </div>
      ))}
    </div>
  );
}
