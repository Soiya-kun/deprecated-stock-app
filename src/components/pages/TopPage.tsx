import { useEffect, useState } from "react";
import { Chart } from "react-google-charts";

import { SixDotsScaleMiddle } from "@/components/ui/SixdotsScaleMiddle";
import { stockValueWithMa, stockVolumes } from "@/domains/stock/computed";
import { useFindFirstByQuery } from "@/hooks/findFirstByQuery";
import { useGetStocks } from "@/hooks/injections";

export function TopPage() {
  const findStocksHook = useFindFirstByQuery(useGetStocks(), () => [], "0001");
  const sv = stockValueWithMa({ stocks: findStocksHook.ret });
  const v = stockVolumes({ stocks: findStocksHook.ret });

  const [dayState, setDayState] = useState<{
    dayCount: number;
    dayBeforeCount: number;
  }>({
    dayCount: 120,
    dayBeforeCount: 45,
  });

  const [isDisabledRightArrow, setIsDisabledRightArrow] =
    useState<boolean>(false);
  const handleKeyDownOnRightArrow = (e: KeyboardEvent) => {
    if (e.key === "ArrowRight") {
      setDayState((prev) => ({
        ...prev,
        dayBeforeCount: prev.dayBeforeCount + 1,
      }));
    }
  };
  const handleKeyDownOnLeftArrow = (e: KeyboardEvent) => {
    if (e.key === "ArrowLeft") {
      setDayState((prev) => ({
        ...prev,
        dayBeforeCount: prev.dayBeforeCount - 1,
      }));
    }
  };

  useEffect(() => {
    // handleKeyDownOnRightArrow, handleKeyDownOnLeftArrowを登録
    window.addEventListener("keydown", handleKeyDownOnRightArrow);
    window.addEventListener("keydown", handleKeyDownOnLeftArrow);
  }, []);

  if (findStocksHook.isLoading || findStocksHook.hasFailed) {
    return <SixDotsScaleMiddle />;
  }

  return (
    <>
      <Chart
        chartType="ComboChart"
        width="100%"
        height="400px"
        data={(
          [["Date", "High", "Open", "Close", "Low", "ma5", "ma20", "ma60"]] as (
            | string
            | number
            | Date
            | null
          )[][]
        ).concat(
          sv.slice(
            dayState.dayBeforeCount,
            dayState.dayCount + dayState.dayBeforeCount,
          ),
        )}
        options={{
          seriesType: "candlesticks",
          series: {
            1: {
              type: "line",
            },
            2: {
              type: "line",
            },
            3: {
              type: "line",
            },
          },
          vAxis: {
            minValue: 0,
          },
          chartArea: {
            left: "15%",
            width: "70%",
          },
        }}
      />
      <Chart
        chartType="ColumnChart"
        width="100%"
        height="400px"
        data={(
          [["Date", "volume"]] as (string | number | Date | null)[][]
        ).concat(
          v.slice(
            dayState.dayBeforeCount,
            dayState.dayCount + dayState.dayBeforeCount,
          ),
        )}
        options={{
          height: 100,
          vAxis: {
            format: "0", // 整数のみを表示
          },
          chartArea: {
            left: "15%",
            width: "70%",
          },
        }}
      />
    </>
  );
}
