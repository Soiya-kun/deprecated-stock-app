import { ChangeEvent, useState } from "react";

import { StockSearchPatternCreatePresenter } from "@/components/features/mypage/stockSearchPattern/StockSearchPatternCreatePresenter";
import { StockPriceSearchForm } from "@/components/features/mypage/stockSearchPattern/form";
import { useUsecase } from "@/hooks/formHook";
import { useSaveSearchStockPattern } from "@/hooks/injections";

export function StockSearchPatternCreateContainer() {
  const [prices, setPrices] = useState<StockPriceSearchForm[]>([
    {
      openedPrice: 1450,
      highPrice: 1545,
      lowPrice: 1420,
      closedPrice: 1525,
      isClosedPointOver: true,
      isClosedPointMatchRank: true,
      isOpenedPointOver: true,
      isOpenedPointMatchRank: true,
      isHighPointOver: true,
      isHighPointMatchRank: true,
      isLowPointOver: true,
      isLowPointMatchRank: true,
    },
    {
      openedPrice: 1500,
      highPrice: 1545,
      lowPrice: 1500,
      closedPrice: 1525,
      isClosedPointOver: true,
      isClosedPointMatchRank: true,
      isOpenedPointOver: true,
      isOpenedPointMatchRank: true,
      isHighPointOver: true,
      isHighPointMatchRank: true,
      isLowPointOver: true,
      isLowPointMatchRank: true,
    },
    {
      openedPrice: 1500,
      highPrice: 1555,
      lowPrice: 1485,
      closedPrice: 1530,
      isClosedPointOver: true,
      isClosedPointMatchRank: true,
      isOpenedPointOver: true,
      isOpenedPointMatchRank: true,
      isHighPointOver: true,
      isHighPointMatchRank: true,
      isLowPointOver: true,
      isLowPointMatchRank: true,
    },
    {
      openedPrice: 1520,
      highPrice: 1575,
      lowPrice: 1515,
      closedPrice: 1560,
      isClosedPointOver: true,
      isClosedPointMatchRank: true,
      isOpenedPointOver: true,
      isOpenedPointMatchRank: true,
      isHighPointOver: true,
      isHighPointMatchRank: true,
      isLowPointOver: true,
      isLowPointMatchRank: true,
    },
    {
      openedPrice: 1550,
      highPrice: 1620,
      lowPrice: 1550,
      closedPrice: 1530,
      isClosedPointOver: true,
      isClosedPointMatchRank: true,
      isOpenedPointOver: true,
      isOpenedPointMatchRank: true,
      isHighPointOver: true,
      isHighPointMatchRank: true,
      isLowPointOver: true,
      isLowPointMatchRank: true,
    },
  ]);

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
    console.log(key, value);
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
        openedPrice: prices[0].openedPrice,
        highPrice: prices[0].highPrice,
        lowPrice: prices[0].lowPrice,
        closedPrice: prices[0].closedPrice,
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
