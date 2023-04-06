import { Ref, useImperativeHandle, useRef } from "react";
import { Chart } from "react-google-charts";

import { GraphValue } from "@/domains/stock/computed";

// GoogleChart の型を定義します。
export interface GoogleChartProps {
  className?: string;
  data: GraphValue[];
  maxVolume: number;
}

// GoogleChart 内のチャートを操作するための Ref オブジェクトの型を定義します。
export interface GoogleChartRef {
  getChart: () => Chart | null;
}

export function DayChartPresenter({
  props,
  ref,
}: {
  props: GoogleChartProps;
  ref: Ref<GoogleChartRef>;
}) {
  const chartRef = useRef<Chart>(null);
  useImperativeHandle(ref, () => ({
    getChart: () => chartRef.current,
  }));

  return (
    <Chart
      className={props.className}
      ref={chartRef}
      chartType="ComboChart"
      data={props.data}
      options={{
        seriesType: "candlesticks",
        candlestick: {
          fallingColor: { strokeWidth: 0, fill: "#EF4444" }, // red
          risingColor: { strokeWidth: 0, fill: "#22C55E" }, // green
        },
        series: {
          1: {
            type: "line",
            color: "red",
          },
          2: {
            type: "line",
            color: "green",
          },
          3: {
            type: "line",
            color: "#e8a070",
          },
          4: {
            type: "bars",
            targetAxisIndex: 1,
            color: "#01104f",
          },
        },
        vAxes: {
          0: {
            title: "円",
          },
          1: {
            // 株の取引ボリューム
            minValue: 0,
            maxValue: props.maxVolume * 4,
            gridlines: {
              color: "transparent", // これにより、縦軸の横線が消えます
            },
            textColor: "transparent", // これにより、縦軸の数字が消えます
          },
        },
        chartArea: {
          left: "15%",
          width: "80%",
        },
      }}
    />
  );
}

export function WeekChartPresenter({
  props,
  ref,
}: {
  props: GoogleChartProps;
  ref: Ref<GoogleChartRef>;
}) {
  const chartRef = useRef<Chart>(null);

  useImperativeHandle(ref, () => ({
    getChart: () => chartRef.current,
  }));
  return (
    <Chart
      className={props.className}
      chartType="ComboChart"
      data={props.data}
      options={{
        seriesType: "candlesticks",
        candlestick: {
          fallingColor: { strokeWidth: 0, fill: "#EF4444" }, // red
          risingColor: { strokeWidth: 0, fill: "#22C55E" }, // green
        },
        series: {
          1: {
            type: "bars",
            targetAxisIndex: 1,
            color: "#01104f",
          },
          2: {
            type: "line",
            color: "red",
          },
          3: {
            type: "line",
            color: "green",
          },
        },
        vAxes: {
          0: { title: "円" },
          1: {
            // 株の取引ボリューム
            minValue: 0,
            maxValue: props.maxVolume * 4,
            gridlines: {
              color: "transparent", // これにより、縦軸の横線が消えます
            },
            textColor: "transparent", // これにより、縦軸の数字が消えます
          },
        },
        chartArea: {
          left: "15%",
          width: "80%",
        },
      }}
    />
  );
}
