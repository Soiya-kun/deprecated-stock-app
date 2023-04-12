import { useEffect, useState } from "react";

import { DayChartPresenter } from "@/components/features/chart/ChartPresenter";
import { chartHook, DateState } from "@/hooks/chartHook";
import { useFindFirstByQuery } from "@/hooks/findFirstByQuery";
import { useGetStockCodes, useGetStocks } from "@/hooks/injections";
import { useList } from "@/hooks/listHook";

export function TodayChartContainer() {
  const stockCodeLictHook = useList(useGetStockCodes());
  const [selectedStockCodeIndex, setSelectedStockCodeIndex] =
    useState<number>(0);
  const selectedCode = () => {
    if (stockCodeLictHook.ret.length === 0) return "";
    return stockCodeLictHook.ret[selectedStockCodeIndex];
  };

  const handleKeyDownOnRightArrow = (e: KeyboardEvent) => {
    if (e.key === "ArrowRight") {
      setSelectedStockCodeIndex((prev) => prev + 1);
    }
  };

  const handleKeyDownOnLeftArrow = (e: KeyboardEvent) => {
    if (e.key === "ArrowLeft") {
      setSelectedStockCodeIndex((prev) => prev - 1);
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDownOnLeftArrow);
    window.addEventListener("keydown", handleKeyDownOnRightArrow);
  }, []);

  const stocks = useFindFirstByQuery(useGetStocks(), () => []);
  const dateState: DateState = {
    dayCount: 60,
    dayBeforeCount: stocks.ret.length - 60,
    weekCount: 24,
  };
  const chartData = chartHook({ stocks: stocks.ret, dateState });
  return (
    <DayChartPresenter
      props={{
        data: chartData.chartData,
        maxVolume: chartData.maxVolumeInSvDay,
      }}
    />
  );
}
