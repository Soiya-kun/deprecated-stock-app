import {
  ComponentProps,
  forwardRef,
  memo,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import {
  DayChartPresenter,
  GoogleChartProps,
  GoogleChartRef,
  WeekChartPresenter,
} from "@/components/features/chart/ChartPresenter";
import { ChartSituationPresenter } from "@/components/features/chart/ChartSituationPresenter";
import {
  SimulationHookType,
  SimulationActionPresenter,
} from "@/components/features/stock/SimulationActionPresenter";
import {
  newStartingSetting,
  SimulationStartPresenter,
  StartingSetting,
} from "@/components/features/stock/SimulationStartPresenter";
import { StockInfoPresenter } from "@/components/features/stock/StockInfoPresenter";
import { useBreakPointContext } from "@/components/functionals/BreakPointContextProvider";
import { InputHook } from "@/components/ui/InputWithTitleAndError";
import { SixDotsScaleMiddle } from "@/components/ui/SixdotsScaleMiddle";
import {
  ma20CrossMa60,
  ma20Direction,
  ma20DirectionTurn,
  ma5CrossMa20,
  ma5CrossMa60,
  ma5Direction,
  ma5DirectionTurn,
  ma60Direction,
  ma60DirectionTurn,
  wma13CrossWma26,
  wma13Direction,
  wma26Direction,
} from "@/domains/ChartSituation/computed";
import { stockInfo } from "@/domains/stock/computed";
import { transactionResult } from "@/domains/stockTransaction/computed";
import {
  newSimulation,
  newUnitTransaction,
  Simulation,
  UnitTransaction,
} from "@/domains/stockTransaction/dto";
import { chartHook, DateState } from "@/hooks/chartHook";
import { useFindFirstByQuery } from "@/hooks/findFirstByQuery";
import { useFindFirstWithNoQuery } from "@/hooks/findFirstWithNoQuery";
import { useGetStocks, useGetStocksByRandom } from "@/hooks/injections";

type Props = {
  className?: string;
  code?: string;
};

const DayChart = memo<ComponentProps<typeof DayChartPresenter>>(
  forwardRef(DayChartPresenter),
);

const WeekChart = memo<ComponentProps<typeof WeekChartPresenter>>(
  forwardRef(WeekChartPresenter),
);

const WeekChartLong = memo<ComponentProps<typeof WeekChartPresenter>>(
  forwardRef(WeekChartPresenter),
);

export function SimulationContainer({ className, code }: Props) {
  const findStocksHook =
    code != null
      ? useFindFirstByQuery(useGetStocks(), () => [], code)
      : useFindFirstWithNoQuery(useGetStocksByRandom(), () => []);

  const [dateState, setDateState] = useState<DateState>({
    dayCount: 60,
    dayBeforeCount: 0,
    weekCount: 24,
    weekLongCount: 48,
    reverseOffset: 120,
  });

  const ch = chartHook({ stocks: findStocksHook.ret, dateState });

  // 開始設定関連
  const [startingSetting, setStartingSetting] = useState<StartingSetting>(
    newStartingSetting(),
  );
  const startSettingInputHook: InputHook<StartingSetting> = {
    handleChangeOnInput: (e, name) => {
      if (name === "startingDate") {
        setStartingSetting({
          ...startingSetting,
          [name]: new Date(e.target.value),
        });
      }
      if (name === "startingAmount") {
        setStartingSetting({
          ...startingSetting,
          [name]: Number(e.target.value) * 10000,
        });
      }
    },
    obj: startingSetting,
    validations: [],
  };

  // simulation関連
  const [simulation, setSimulation] = useState<Simulation>(newSimulation);

  const [isStart, setIsStart] = useState<boolean>(false);
  const [startErrorMessage, setStartErrorMessage] = useState<string>("");
  const handleClickOnStartButton = () => {
    const dateIndex = findStocksHook.ret.findIndex(
      (stock) =>
        stock.bDate ===
        startingSetting.startingDate.toISOString().substring(0, 10),
    );
    if (dateIndex === -1) {
      setStartErrorMessage("開始日に取引情報が見つかりませんでした");
      return;
    }
    if (dateIndex - dateState.dayCount < 0) {
      setStartErrorMessage("開始日が早すぎます");
      return;
    }
    setIsStart(true);
    setDateState({
      ...dateState,
      dayBeforeCount: dateIndex - dateState.dayCount,
    });
    setSimulation({
      ...simulation,
      startingAmount: startingSetting.startingAmount,
    });
  };

  const result = transactionResult(simulation, ch.currentValue);

  const [unitTransaction, setUnitTransaction] = useState<UnitTransaction>(
    newUnitTransaction(),
  );
  const simulationHook: SimulationHookType = {
    handleChangeOnInput: (e, name) => {
      if (name === "volume") {
        setUnitTransaction({
          ...unitTransaction,
          [name]: Number(e.target.value) * 100,
        });
      }
      if (name === "memo") {
        setUnitTransaction({
          ...unitTransaction,
          [name]: e.target.value,
        });
      }
    },
    handleClickOnTradeButton: (type) => {
      if (ch.currentValue * unitTransaction.volume > result.cashPosition)
        return;
      setSimulation({
        ...simulation,
        tradeTransactions: [
          ...simulation.tradeTransactions,
          {
            volume: unitTransaction.volume,
            date: new Date(ch.currentDate),
            transactionType: type,
            unitValue: ch.currentValue,
            memo: unitTransaction.memo,
          },
        ],
      });
    },
    obj: unitTransaction,
  };

  const handleKeyDownOnRightArrow = (e: KeyboardEvent) => {
    if (e.key === "ArrowRight") {
      setDateState((prev) => ({
        ...prev,
        dayBeforeCount: prev.dayBeforeCount + 1,
      }));
    }
  };

  const dayChartRef = useRef<GoogleChartRef>(null);
  const dayChartProps: GoogleChartProps = useMemo(
    () => ({
      className: "w-full min-h-[24rem] h-[40vh]",
      data: ch.chartData,
      maxVolume: ch.maxVolumeInSvDay,
    }),
    [ch.chartData, ch.maxVolumeInSvDay],
  );

  const weekChartRef = useRef<GoogleChartRef>(null);
  const weekChartProps = useMemo(
    () => ({
      className: "w-full min-h-[24rem] h-[40vh]",
      data: ch.chartDataWeek,
      maxVolume: ch.maxVolumeInSvWeek,
    }),
    [ch.chartDataWeek, ch.maxVolumeInSvWeek],
  );

  const weekLongChartRef = useRef<GoogleChartRef>(null);
  const weekLongChartProps = useMemo(
    () => ({
      className: "w-full min-h-[24rem] h-[40vh]",
      data: ch.chartDataWeekLongReverse,
      maxVolume: ch.maxVolumeInSvWeekLongReverse,
    }),
    [ch.chartDataWeekLongReverse, ch.maxVolumeInSvWeekLongReverse],
  );

  useEffect(() => {
    if (!isStart) return;
    // handleKeyDownOnRightArrow, handleKeyDownOnLeftArrowを登録
    window.addEventListener("keydown", handleKeyDownOnRightArrow);
  }, [isStart]);

  const { showMode } = useBreakPointContext();
  return showMode === "pc" ? (
    <div>
      <div className={`flex w-full ${className}`}>
        <div
          className={`w-1/2 flex-col items-center justify-center pr-4 ${
            isStart ? "" : "flex"
          }`}
        >
          {!isStart && (
            <SimulationStartPresenter
              inputHook={startSettingInputHook}
              handleClickOnStartButton={handleClickOnStartButton}
              minDate={ch.minDate}
              errorMessage={startErrorMessage}
            />
          )}
          {isStart && (
            <>
              <StockInfoPresenter
                stockInfo={stockInfo(
                  findStocksHook.ret[
                    dateState.dayBeforeCount + dateState.dayCount - 1
                  ],
                  findStocksHook.ret[
                    dateState.dayBeforeCount + dateState.dayCount - 2
                  ],
                )}
              />
              <ChartSituationPresenter
                className="mt-2"
                chartData={ch.chartData}
                chartDataWeek={ch.chartDataWeek}
                funcs={[
                  [
                    ma5Direction,
                    ma20Direction,
                    ma60Direction,
                    wma13Direction,
                    wma26Direction,
                  ],
                  [ma5DirectionTurn, ma20DirectionTurn, ma60DirectionTurn],
                  [ma5CrossMa20, ma5CrossMa60, ma20CrossMa60, wma13CrossWma26],
                ]}
              />
              <SimulationActionPresenter
                className="mt-4"
                simulationHook={simulationHook}
                simulation={simulation}
                simulationResult={result}
                isToSave
              />
            </>
          )}
        </div>
        <div className="min-h-[52rem] w-1/2">
          {findStocksHook.isLoading ? (
            <div className="flex h-full w-full items-center justify-center">
              <SixDotsScaleMiddle />
            </div>
          ) : (
            <>
              <DayChart ref={dayChartRef} props={dayChartProps} />
              <WeekChart ref={weekChartRef} props={weekChartProps} />
            </>
          )}
        </div>
      </div>
      <div className="px-12">
        <WeekChartLong ref={weekLongChartRef} props={weekLongChartProps} />
      </div>
    </div>
  ) : (
    <div className="flex overflow-x-auto">
      <DayChart
        ref={dayChartRef}
        props={{ ...dayChartProps, className: "w-full" }}
      />
    </div>
  );
}
