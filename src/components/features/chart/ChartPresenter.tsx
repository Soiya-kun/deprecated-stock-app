import { Ref, useImperativeHandle, useRef } from "react";
import { Chart } from "react-google-charts";

import { GraphValue } from "@/domains/stock/computed";

// GoogleChart の型を定義します。
interface GoogleChartProps {
  width?: string;
  height?: string;
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
      ref={chartRef}
      chartType="ComboChart"
      width={props.width ?? "100%"}
      height={props.height ?? "400px"}
      data={props.data}
      options={{
        seriesType: "candlesticks",
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
            color: "yellow",
          },
          4: {
            type: "bars",
            targetAxisIndex: 1,
            color: "blue",
          },
        },
        vAxes: {
          0: { title: "円" },
          1: {
            title: "株",
            minValue: 0,
            maxValue: props.maxVolume * 4,
          },
        },
        chartArea: {
          left: "10%",
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
      chartType="ComboChart"
      width={props.width ?? "100%"}
      height={props.height ?? "400px"}
      data={props.data}
      options={{
        seriesType: "candlesticks",
        series: {
          1: {
            type: "bars",
            targetAxisIndex: 1,
            color: "blue",
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
            title: "株",
            minValue: 0,
            maxValue: props.maxVolume * 4,
          },
        },
        chartArea: {
          left: "10%",
          width: "80%",
        },
      }}
    />
  );
}
