import { ChangeEvent } from "react";

import { InputFileButton } from "@/components/ui/InputFileButton";
import { StockCreate } from "@/domains/stock/dto";

type Props = {
  handleChangeOnInputFile: (e: ChangeEvent<HTMLInputElement>) => void;
  stocksCreate: StockCreate[];
};

export function StockAddPresenter({
  handleChangeOnInputFile,
  stocksCreate,
}: Props) {
  return (
    <div>
      <InputFileButton onChange={handleChangeOnInputFile} />
      {stocksCreate.map((stockCreate) => (
        <div className="flex" key={stockCreate.stockCode}>
          <p>{stockCreate.stockCode}</p>
        </div>
      ))}
    </div>
  );
}
