import { useEffect, useMemo, useState } from "react";
import { Chart } from "react-google-charts";

import {
  SimulationHook,
  SimulationPresenter,
} from "@/components/features/stock/SimulationPresenter";
import {
  newStartingSetting,
  SimulationStartPresenter,
  StartingSetting,
} from "@/components/features/stock/SimulationStartPresenter";
import { InputHook } from "@/components/ui/InputWithTitleAndError";
import { SixDotsScaleMiddle } from "@/components/ui/SixdotsScaleMiddle";
import {
  GraphValue,
  stockValueWeekWithMa,
  stockValueWithMa,
} from "@/domains/stock/computed";
import {
  newUnitTransaction,
  TransactionType,
  UnitTransaction,
} from "@/domains/stockTransaction/dto";
import { handleChangeOnInput } from "@/handlers/commonHandlers";
import { useFindFirstByQuery } from "@/hooks/findFirstByQuery";
import { useGetStocks } from "@/hooks/injections";

export function TopPage() {
  const findStocksHook = useFindFirstByQuery(useGetStocks(), () => [], "0001");
  const svDay = useMemo(
    () => stockValueWithMa({ stocks: findStocksHook.ret }),
    [findStocksHook.ret],
  );
  const svWeek = useMemo(
    () => stockValueWeekWithMa({ stocks: findStocksHook.ret }),
    [findStocksHook.ret],
  );

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

  const [startingSetting, setStartingSetting] = useState<StartingSetting>(
    newStartingSetting(),
  );
  const startSettingInputHook: InputHook<StartingSetting> = {
    handleChangeOnInput: (e, name, type) =>
      handleChangeOnInput<StartingSetting>(
        e,
        name,
        setStartingSetting,
        startingSetting,
        type,
      ),
    obj: startingSetting,
    validations: [],
  };

  const [isStart, setIsStart] = useState<boolean>(false);
  const handleClickOnStartButton = () => {
    setIsStart(true);
  };

  const [unitTransaction, setUnitTransaction] = useState<UnitTransaction>(
    newUnitTransaction(),
  );
  const simulationHook: SimulationHook = {
    handleChangeOnInput: (e, name) => {
      if (name === "transactionType") {
        setUnitTransaction({
          ...unitTransaction,
          [name]: e.target.value as TransactionType,
        });
      }
      if (name === "volume") {
        setUnitTransaction({
          ...unitTransaction,
          [name]: 100 * Number(e.target.value),
        });
      }
    },
    handleClickOnBuyButton: () => {},
    obj: unitTransaction,
  };
  useEffect(() => {}, [dateState]);

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
    <div className="flex h-[90] w-full">
      <div className="flex w-1/2 items-center justify-center">
        {!isStart && (
          <SimulationStartPresenter
            inputHook={startSettingInputHook}
            handleClickOnStartButton={handleClickOnStartButton}
          />
        )}
        {isStart && <SimulationPresenter simulationHook={simulationHook} />}
      </div>
      <div className="w-1/2">
        <div>
          <Chart
            chartType="ComboChart"
            width="100%"
            height="400px"
            data={(
              [
                [
                  "Date",
                  "High",
                  "Open",
                  "Close",
                  "Low",
                  "ma5",
                  "ma20",
                  "ma60",
                  "volume",
                ],
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
                4: {
                  type: "bars",
                  targetAxisIndex: 1,
                },
              },
              vAxes: {
                0: { title: "円" },
                1: {
                  title: "株",
                  minValue: 0,
                  maxValue:
                    Number(
                      svDay
                        .slice(
                          dateState.dayBeforeCount,
                          dateState.dayCount + dateState.dayBeforeCount,
                        )
                        .sort((a, b) => Number(b[8]) - Number(a[8]))[0][8],
                    ) * 4,
                },
              },
              chartArea: {
                left: "15%",
                width: "70%",
              },
            }}
          />
        </div>
        <div>
          <Chart
            chartType="ComboChart"
            width="100%"
            height="400px"
            data={(
              [
                [
                  "Date",
                  "High",
                  "Open",
                  "Close",
                  "Low",
                  "volume",
                  "ma13",
                  "ma26",
                ],
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
                  type: "bars",
                  targetAxisIndex: 1,
                },
                2: {
                  type: "line",
                },
                3: {
                  type: "line",
                },
              },
              vAxes: {
                0: { title: "円" },
                1: {
                  title: "株",
                  minValue: 0,
                  maxValue:
                    Number(
                      svWeek
                        .slice(
                          dateState.weekBeforeCount,
                          dateState.weekCount + dateState.weekBeforeCount,
                        )
                        .sort((a, b) => Number(b[5]) - Number(a[5]))[0][5],
                    ) * 4,
                },
              },
              chartArea: {
                left: "15%",
                width: "70%",
              },
            }}
          />
        </div>
      </div>
    </div>
  );
}
