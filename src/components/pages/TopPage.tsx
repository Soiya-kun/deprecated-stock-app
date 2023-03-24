import { useEffect, useState } from "react";
import { Chart } from "react-google-charts";

import { SixDotsScaleMiddle } from "@/components/ui/SixdotsScaleMiddle";
import {
  GraphValue,
  stockValueWeekWithMa,
  stockValueWithMa,
  stockVolumes,
  stockVolumesWeek,
} from "@/domains/stock/computed";
import { useFindFirstByQuery } from "@/hooks/findFirstByQuery";
import { useGetStocks } from "@/hooks/injections";

export function TopPage() {
  const findStocksHook = useFindFirstByQuery(useGetStocks(), () => [], "0001");
  const svDay = stockValueWithMa({ stocks: findStocksHook.ret });
  const vDay = stockVolumes({ stocks: findStocksHook.ret });
  const svWeek = stockValueWeekWithMa({ stocks: findStocksHook.ret });
  const vWeek = stockVolumesWeek({ stocks: findStocksHook.ret });

  const [dateState, setDateState] = useState<{
    dayCount: number;
    dayBeforeCount: number;
    weekCount: number;
    weekBeforeCount: number;
  }>({
    dayCount: 60,
    dayBeforeCount: 45,
    weekCount: 12,
    weekBeforeCount: 9,
  });

  const [isDisabledRightArrow, setIsDisabledRightArrow] =
    useState<boolean>(false);
  const handleKeyDownOnRightArrow = (e: KeyboardEvent) => {
    if (e.key === "ArrowRight") {
      setDateState((prev) => ({
        ...prev,
        dayBeforeCount: prev.dayBeforeCount + 1,
      }));
    }
  };
  const handleKeyDownOnLeftArrow = (e: KeyboardEvent) => {
    if (e.key === "ArrowLeft") {
      setDateState((prev) => ({
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
    <div className="flex">
      <div className="w-1/3">
        <Chart
          chartType="ComboChart"
          width="100%"
          height="400px"
          data={(
            [
              ["Date", "High", "Open", "Close", "Low", "ma5", "ma20", "ma60"],
            ] as GraphValue[]
          ).concat(
            svDay.slice(
              dateState.dayBeforeCount,
              dateState.dayCount + dateState.dayBeforeCount,
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
          data={([["Date", "volume"]] as GraphValue[]).concat(
            vDay.slice(
              dateState.dayBeforeCount,
              dateState.dayCount + dateState.dayBeforeCount,
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
      </div>
      <div className="w-1/3">
        <Chart
          chartType="ComboChart"
          width="100%"
          height="400px"
          data={(
            [
              ["Date", "High", "Open", "Close", "Low", "ma13", "ma26"],
            ] as GraphValue[]
          ).concat(
            svWeek.slice(
              dateState.weekBeforeCount,
              dateState.weekCount + dateState.weekBeforeCount,
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
          className="top-8"
          chartType="ColumnChart"
          width="100%"
          height="400px"
          data={([["Date", "volume"]] as GraphValue[]).concat(
            vWeek.slice(
              dateState.weekBeforeCount,
              dateState.weekCount + dateState.weekBeforeCount,
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
      </div>
    </div>
  );
}
