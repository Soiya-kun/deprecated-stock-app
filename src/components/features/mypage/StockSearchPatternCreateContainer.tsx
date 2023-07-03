import { ChangeEvent, useState } from "react";

import { StockSearchPatternCreatePresenter } from "@/components/features/mypage/StockSearchPatternCreatePresenter";
import { StockPrice } from "@/domains/stock/dto";

export function StockSearchPatternCreateContainer() {
  const [prices, setPrices] = useState<StockPrice[]>([
    {
      openedPrice: 1500,
      highPrice: 1555,
      lowPrice: 1485,
      closedPrice: 1530,
    },
    {
      openedPrice: 1520,
      highPrice: 1575,
      lowPrice: 1515,
      closedPrice: 1560,
    },
    {
      openedPrice: 1550,
      highPrice: 1620,
      lowPrice: 1550,
      closedPrice: 1530,
    },
  ]);

  const handleChangePrice = (
    indexCol: number,
    key: keyof StockPrice,
    e: ChangeEvent<HTMLInputElement>,
  ) => {
    const newValues = [...prices];
    newValues[indexCol][key] = Number(e.target.value);
    setPrices(newValues);
  };

  const max = Math.max(...prices.map((p) => p.highPrice));

  return (
    <StockSearchPatternCreatePresenter
      prices={prices}
      max={max}
      handleChangePrice={handleChangePrice}
    />
  );
}
