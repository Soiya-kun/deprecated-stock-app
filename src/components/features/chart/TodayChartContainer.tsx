import { useEffect, useState } from "react";

import {
  DayChartPresenter,
  WeekChartPresenter,
} from "@/components/features/chart/ChartPresenter";
import { ChartSituationPresenter } from "@/components/features/chart/ChartSituationPresenter";
import { StockInfoPresenter } from "@/components/features/stock/StockInfoPresenter";
import { SixDotsScaleMiddle } from "@/components/ui/SixdotsScaleMiddle";
import {
  ma20CrossMa60,
  ma20Direction,
  ma5CrossMa20,
  ma5CrossMa60,
  ma5Direction,
  ma60Direction,
  wma13CrossWma26,
  wma13Direction,
  wma26Direction,
} from "@/domains/ChartSituation/computed";
import { stockInfo } from "@/domains/stock/computed";
import { chartHook, DateState } from "@/hooks/chartHook";
import { useFindFirstByQuery } from "@/hooks/findFirstByQuery";
import { useGetStockCodes, useGetStocks } from "@/hooks/injections";
import { useList } from "@/hooks/listHook";

export function TodayChartContainer({
  className = "",
}: {
  className?: string;
}) {
  const stockCodeListHook = useList(useGetStockCodes());
  const [selectedStockCodeIndex, setSelectedStockCodeIndex] =
    useState<number>(0);
  const selectedCode = () => {
    if (
      stockCodeListHook.ret.length === 0 ||
      stockCodeListHook.ret.length < selectedStockCodeIndex
    )
      return "";
    return stockCodeListHook.ret[selectedStockCodeIndex];
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

  const stocks = useFindFirstByQuery(useGetStocks(), () => [], selectedCode());
  useEffect(() => {
    stocks.find(selectedCode());
  }, [selectedStockCodeIndex]);

  const dateState: DateState = {
    dayCount: 60,
    dayBeforeCount: stocks.ret.length - 60,
    weekCount: 24,
  };

  const ch = chartHook({ stocks: stocks.ret, dateState });

  if (stocks.isLoading || ch.chartData.length === 1)
    return <SixDotsScaleMiddle />;

  return (
    <div className={`flex items-center justify-center ${className}`}>
      <div className="w-1/2">
        <StockInfoPresenter
          stockInfo={stockInfo(
            stocks.ret[dateState.dayBeforeCount + dateState.dayCount - 1],
            stocks.ret[dateState.dayBeforeCount + dateState.dayCount - 2],
          )}
        />
        <ChartSituationPresenter
          className="mt-2"
          chartData={ch.chartData}
          chartDataWeek={ch.chartDataWeek}
          funcs={[
            ma5Direction,
            ma20Direction,
            ma60Direction,
            wma13Direction,
            wma26Direction,
            ma5CrossMa20,
            ma5CrossMa60,
            ma20CrossMa60,
            wma13CrossWma26,
          ]}
        />
      </div>
      <div className="w-1/2">
        <DayChartPresenter
          props={{
            data: ch.chartData,
            className: "w-full h-96",
            maxVolume: ch.maxVolumeInSvDay,
          }}
        />
        <WeekChartPresenter
          props={{
            data: ch.chartDataWeek,
            className: "w-full h-96",
            maxVolume: ch.maxVolumeInSvWeek,
          }}
        />
      </div>
    </div>
  );
}
