import { useMemo } from "react";

import {
  GraphValue,
  stockValueWeekWithMa,
  stockValueWithMa,
} from "@/domains/stock/computed";
import { Stock } from "@/domains/stock/dto";

export type DateState = {
  dayCount: number;
  dayBeforeCount: number;
  weekCount: number;
  weekBeforeCount: number;
};

type Props = {
  stocks: Stock[];
  dateState: DateState;
};

export const chartHook = ({
  stocks,
  dateState,
}: Props): {
  minDate: string;
  svDay: GraphValue[];
  chartData: GraphValue[];
  maxVolumeInSvDay: number;
  svWeek: GraphValue[];
  chartDataWeek: GraphValue[];
  maxVolumeInSvWeek: number;
  currentValue: number;
} => {
  const minDate = useMemo(() => {
    if (stocks.length === 0) return "";
    return stocks[0].bDate;
  }, [stocks]);

  const svDay = useMemo(() => stockValueWithMa({ stocks }), [stocks]);

  const currentValue =
    svDay[dateState.dayCount + dateState.dayBeforeCount] !== undefined
      ? Number(svDay[dateState.dayCount + dateState.dayBeforeCount - 1][3])
      : 0;

  const chartData = useMemo(
    () =>
      (
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
      ),
    [svDay, dateState.dayBeforeCount, dateState.dayCount],
  );
  const maxVolumeInSvDay: number = useMemo(() => {
    const ret = chartData.slice(1).sort((a, b) => Number(b[8]) - Number(a[8]));
    if (ret.length === 0) return 0;
    return Number(ret[0][8]);
  }, [svDay]);

  const svWeek = useMemo(() => stockValueWeekWithMa({ stocks }), [stocks]);
  const chartDataWeek = useMemo(
    () =>
      (
        [
          ["Date", "High", "Open", "Close", "Low", "volume", "ma13", "ma26"],
        ] as GraphValue[]
      ).concat(
        svWeek.slice(
          dateState.weekBeforeCount,
          dateState.weekCount + dateState.weekBeforeCount,
        ),
      ),
    [svWeek, dateState.weekBeforeCount, dateState.weekCount],
  );
  const maxVolumeInSvWeek: number = useMemo(() => {
    const ret = chartDataWeek
      .slice(1)
      .sort((a, b) => Number(b[5]) - Number(a[5]));
    if (ret.length === 0) return 0;
    return Number(ret[0][5]);
  }, [svWeek]);

  return {
    minDate,
    svDay,
    maxVolumeInSvDay,
    chartData,
    svWeek,
    chartDataWeek,
    maxVolumeInSvWeek,
    currentValue,
  };
};
