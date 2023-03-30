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
  console.log(props);
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
            maxValue: props.maxVolume * 4,
          },
        },
        chartArea: {
          left: "15%",
          width: "70%",
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
            maxValue: props.maxVolume * 4,
          },
        },
        chartArea: {
          left: "15%",
          width: "70%",
        },
      }}
    />
  );
}
