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
  GoogleChartRef,
  WeekChartPresenter,
} from "@/components/features/chart/ChartPresenter";
import { ChartSituationPresenter } from "@/components/features/chart/ChartSituationPresenter";
import {
  SimulationHookType,
  SimulationPresenter,
} from "@/components/features/stock/SimulationPresenter";
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
  ma5CrossMa20,
  ma5CrossMa60,
  ma5Direction,
  ma60Direction,
  wma13CrossWma26,
  wma13Direction,
  wma26Direction,
} from "@/domains/ChartSituation/computed";
import { stockInfo } from "@/domains/stock/computed";
import {
  newSimulation,
  newUnitTransaction,
  Simulation,
  UnitTransaction,
} from "@/domains/stockTransaction/dto";
import { chartHook, DateState } from "@/hooks/chartHook";
import { useFindFirstByQuery } from "@/hooks/findFirstByQuery";
import { useGetStocks } from "@/hooks/injections";

const DayChart = memo<ComponentProps<typeof DayChartPresenter>>(
  forwardRef(DayChartPresenter),
);

const WeekChart = memo<ComponentProps<typeof WeekChartPresenter>>(
  forwardRef(WeekChartPresenter),
);

export function TopPage() {
  const findStocksHook = useFindFirstByQuery(useGetStocks(), () => [], "0001");

  const [dateState, setDateState] = useState<DateState>({
    dayCount: 60,
    dayBeforeCount: 0,
    weekCount: 24,
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
  const handleClickOnStartButton = () => {
    const dateIndex = findStocksHook.ret.findIndex(
      (stock) =>
        stock.bDate ===
        startingSetting.startingDate.toISOString().substring(0, 10),
    );
    if (dateIndex - dateState.dayCount < 0) return;
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
  const dayChartProps = useMemo(
    () => ({
      data: ch.chartData,
      maxVolume: ch.maxVolumeInSvDay,
    }),
    [ch.chartData, ch.maxVolumeInSvDay],
  );
  const weekChartRef = useRef<GoogleChartRef>(null);
  const weekChartProps = useMemo(
    () => ({
      data: ch.chartDataWeek,
      maxVolume: ch.maxVolumeInSvWeek,
    }),
    [ch.chartDataWeek, ch.maxVolumeInSvWeek],
  );

  useEffect(() => {
    if (!isStart) return;
    // handleKeyDownOnRightArrow, handleKeyDownOnLeftArrowを登録
    window.addEventListener("keydown", handleKeyDownOnRightArrow);
  }, [isStart]);

  if (findStocksHook.isLoading || findStocksHook.hasFailed) {
    return <SixDotsScaleMiddle />;
  }

  const { showMode } = useBreakPointContext();
  return showMode === "pc" ? (
    <div className="flex h-[90] w-full">
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
              className="mt-4"
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
            <SimulationPresenter
              className="mt-4"
              simulationHook={simulationHook}
              simulation={simulation}
              currentValue={ch.currentValue}
            />
          </>
        )}
      </div>
      <div className="w-1/2">
        <DayChart ref={dayChartRef} props={dayChartProps} />
        <WeekChart ref={weekChartRef} props={weekChartProps} />
      </div>
    </div>
  ) : (
    <div className="flex overflow-x-auto">
      <DayChart
        ref={dayChartRef}
        props={{ ...dayChartProps, className: "w-full", height: "75vh" }}
      />
    </div>
  );
}
