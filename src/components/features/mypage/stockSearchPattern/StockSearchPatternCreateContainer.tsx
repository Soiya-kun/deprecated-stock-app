import { ChangeEvent, useState } from "react";

import { StockSearchPatternCreatePresenter } from "@/components/features/mypage/stockSearchPattern/StockSearchPatternCreatePresenter";
import { StockPriceSearchForm } from "@/components/features/mypage/stockSearchPattern/form";
import { useUsecase } from "@/hooks/formHook";
import { useSaveSearchStockPattern } from "@/hooks/injections";

export function StockSearchPatternCreateContainer() {
  const [prices, setPrices] = useState<StockPriceSearchForm[]>([]);

  const handleChangePrice = (
    indexCol: number,
    key: keyof StockPriceSearchForm,
    e: ChangeEvent<HTMLInputElement>,
  ) => {
    if (
      key === "openedPrice" ||
      key === "closedPrice" ||
      key === "highPrice" ||
      key === "lowPrice"
    ) {
      const newValues = [...prices];
      newValues[indexCol][key] = Number(e.target.value);
      setPrices(newValues);
    } else {
      const newValues = [...prices];
      newValues[indexCol][key] = e.target.checked;
      setPrices(newValues);
    }
  };

  const handleChangeBool = (
    indexCol: number,
    key: keyof StockPriceSearchForm,
    value: boolean | undefined,
  ) => {
    if (
      key === "isLowPointOver" ||
      key === "isHighPointOver" ||
      key === "isOpenedPointOver" ||
      key === "isClosedPointOver"
    ) {
      const newValues = [...prices];
      newValues[indexCol][key] = value;
      setPrices(newValues);
    }
  };

  const max = Math.max(...prices.map((p) => p.highPrice));

  const handleClickAddButton = () => {
    setPrices([
      ...prices,
      {
        highPrice: prices.length === 0 ? 1000 : prices[0].highPrice,
        closedPrice: prices.length === 0 ? 600 : prices[0].closedPrice,
        openedPrice: prices.length === 0 ? 400 : prices[0].openedPrice,
        lowPrice: prices.length === 0 ? 0 : prices[0].lowPrice,
        isClosedPointOver: undefined,
        isClosedPointMatchRank: true,
        isOpenedPointOver: undefined,
        isOpenedPointMatchRank: true,
        isHighPointOver: undefined,
        isHighPointMatchRank: true,
        isLowPointOver: undefined,
        isLowPointMatchRank: true,
      },
    ]);
  };

  const savePattern = useUsecase(useSaveSearchStockPattern());

  const handleClickSubmitButton = async () => {
    await savePattern.exec({
      volumePatterns: [],
      pricePatterns: prices,
      maXUpDownPatterns: [],
    });
  };

  return (
    <StockSearchPatternCreatePresenter
      prices={prices}
      max={max}
      handleChangePrice={handleChangePrice}
      handleChangeBool={handleChangeBool}
      handleClickAddButton={handleClickAddButton}
      handleClickSubmitButton={handleClickSubmitButton}
    />
  );
}
