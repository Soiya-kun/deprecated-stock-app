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
  weekLongCount: number;
  reverseOffset?: number;
};

type Props = {
  stocks: Stock[];
  dateState: DateState;
};

export const chartHook = ({
  stocks,
  dateState,
}: Props): {
  svDay: GraphValue[];
  svWeek: GraphValue[];
  svWeekLong: GraphValue[];
  svWeekLongReverse: GraphValue[];
  chartData: GraphValue[];
  chartDataWeek: GraphValue[];
  chartDataWeekLong: GraphValue[];
  chartDataWeekLongReverse: GraphValue[];
  minDate: string;
  maxVolumeInSvDay: number;
  maxVolumeInSvWeek: number;
  maxVolumeInSvWeekLong: number;
  maxVolumeInSvWeekLongReverse: number;
  currentValue: number;
  currentDate: string;
} => {
  const minDate = useMemo(() => {
    if (stocks.length === 0) return "";
    if (stocks[dateState.dayCount] === undefined) return "";
    return stocks[dateState.dayCount].bDate;
  }, [stocks]);

  const svDay = useMemo(() => stockValueWithMa({ stocks }), [stocks]);

  const currentStock = svDay[dateState.dayCount + dateState.dayBeforeCount - 1];
  const currentValue = currentStock !== undefined ? Number(currentStock[3]) : 0;
  const currentDate = currentStock !== undefined ? String(currentStock[0]) : "";

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
    const ret = chartData.slice(1);
    ret.sort((a, b) => Number(b[8]) - Number(a[8]));
    if (ret.length === 0) return 0;
    return Number(ret[0][8]);
  }, [chartData]);

  const svWeek = useMemo(
    () =>
      stockValueWeekWithMa({
        stocks: stocks.slice(0, dateState.dayCount + dateState.dayBeforeCount),
      }),
    [stocks, dateState.dayBeforeCount, dateState.dayCount],
  );

  const svWeekLong = useMemo(
    () =>
      stockValueWeekWithMa({
        stocks: stocks.slice(
          0,
          dateState.dayCount * 3 + dateState.dayBeforeCount,
        ),
      }),
    [stocks, dateState.dayBeforeCount, dateState.dayCount],
  );

  const svWeekLongReverse = useMemo(
    () =>
      stockValueWeekWithMa({
        stocks: stocks.slice(
          0,
          dateState.dayCount * 3 +
            dateState.dayBeforeCount -
            (dateState.reverseOffset === undefined
              ? 0
              : dateState.reverseOffset),
        ),
      }),
    [stocks, dateState.dayBeforeCount, dateState.dayCount],
  );

  const chartDataWeek = useMemo(
    () =>
      (
        [
          ["Date", "High", "Open", "Close", "Low", "volume", "ma13", "ma26"],
        ] as GraphValue[]
      ).concat(svWeek.slice(-dateState.weekCount)),
    [svWeek, dateState.weekCount],
  );

  const maxVolumeInSvWeek: number = useMemo(() => {
    const ret = chartDataWeek.slice(1);
    ret.sort((a, b) => Number(b[5]) - Number(a[5]));
    if (ret.length === 0) return 0;
    return Number(ret[0][5]);
  }, [chartDataWeek]);

  const chartDataWeekLong = useMemo(
    () =>
      (
        [
          ["Date", "High", "Open", "Close", "Low", "volume", "ma13", "ma26"],
        ] as GraphValue[]
      ).concat(svWeekLong.slice(-dateState.weekLongCount)),
    [svWeekLong, dateState.weekLongCount],
  );

  const maxVolumeInSvWeekLong: number = useMemo(() => {
    const ret = chartDataWeekLong.slice(1);
    ret.sort((a, b) => Number(b[5]) - Number(a[5]));
    if (ret.length === 0) return 0;
    return Number(ret[0][5]);
  }, [chartDataWeekLong]);

  const chartDataWeekLongReverse = useMemo(
    () =>
      (
        [
          ["Date", "High", "Open", "Close", "Low", "volume", "ma13", "ma26"],
        ] as GraphValue[]
      ).concat(svWeekLongReverse.slice(-dateState.weekLongCount)),
    [svWeekLongReverse, dateState.weekLongCount],
  );

  const maxVolumeInSvWeekLongReverse: number = useMemo(() => {
    const ret = chartDataWeekLong.slice(1);
    ret.sort((a, b) => Number(b[5]) - Number(a[5]));
    if (ret.length === 0) return 0;
    return Number(ret[0][5]);
  }, [chartDataWeekLongReverse]);

  return {
    minDate,
    svDay,
    maxVolumeInSvDay,
    chartData,
    svWeek,
    svWeekLong,
    chartDataWeek,
    chartDataWeekLong,
    maxVolumeInSvWeek,
    maxVolumeInSvWeekLong,
    svWeekLongReverse,
    chartDataWeekLongReverse,
    maxVolumeInSvWeekLongReverse,
    currentValue,
    currentDate,
  };
};
