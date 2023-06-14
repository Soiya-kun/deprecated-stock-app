import { useState } from "react";

import {
  StockSplitAddHook,
  StockSplitAddPresenter,
} from "@/components/features/adminPage/StockSplitAddPresenter";
import { newStockSplit, StockSplit } from "@/domains/stockSplit/dto";
import { handleChangeOnInput } from "@/handlers/commonHandlers";
import { useCreateStockSplit } from "@/hooks/injections";

export function StockSplitAddContainer() {
  const [stockSplit, setStockSplit] = useState<StockSplit>(newStockSplit());
  const stockSplitHook: StockSplitAddHook = {
    handleClickOnAddButton: async () => {
      try {
        const add = useCreateStockSplit();
        await add(stockSplit);
      } catch (e) {
        console.error(e);
      }
    },
    obj: stockSplit,
    validations: [],
    handleChangeOnInput: (e, name, type) => {
      handleChangeOnInput<StockSplit>(e, name, setStockSplit, stockSplit, type);
    },
  };

  return <StockSplitAddPresenter stockSplitAddHook={stockSplitHook} />;
}
