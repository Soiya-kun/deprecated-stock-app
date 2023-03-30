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
    weekCount: 12,
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
  const simulationHook: SimulationHook = {
    handleChangeOnInput: (e, name) => {
      if (name === "volume") {
        setUnitTransaction({
          ...unitTransaction,
          [name]: Number(e.target.value) * 100,
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

  return (
    <div className="flex h-[90] w-full">
      <div className="flex w-1/2 items-center justify-center">
        {!isStart && (
          <SimulationStartPresenter
            inputHook={startSettingInputHook}
            handleClickOnStartButton={handleClickOnStartButton}
            minDate={ch.minDate}
          />
        )}
        {isStart && (
          <SimulationPresenter
            simulationHook={simulationHook}
            simulation={simulation}
            currentValue={ch.currentValue}
          />
        )}
      </div>
      <div className="w-1/2">
        <DayChart ref={dayChartRef} props={dayChartProps} />
        <WeekChart ref={weekChartRef} props={weekChartProps} />
      </div>
    </div>
  );
}
