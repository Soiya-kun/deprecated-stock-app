import { Chart } from "react-google-charts";

import { mockStock } from "@/adapters/api/stock/mock";
import { stocksComputed } from "@/domains/stock/computed";
import { Stock } from "@/domains/stock/dto";

export function TopPage() {
  const data: Stock[] = Array(120)
    .fill(0)
    .map((_, i) => mockStock(i));

  const volume = [
    ["Date", "Volume"],
    ["2019-01-01", 100],
    ["2019-01-02", 200],
    ["2019-01-03", 300],
    ["2019-01-04", 400],
    ["2019-01-05", 500],
    ["2019-01-06", 600],
    ["2019-01-07", 700],
    ["2019-01-08", 800],
    ["2019-01-09", 900],
    ["2019-01-10", 1000],
    ["2019-01-11", 1100],
    ["2019-01-12", 1200],
    ["2019-01-13", 1300],
    ["2019-01-14", 1400],
    ["2019-01-15", 1500],
    ["2019-01-16", 1600],
    ["2019-01-17", 1700],
    ["2019-01-18", 1800],
    ["2019-01-19", 1900],
    ["2019-01-20", 2000],
    ["2019-01-21", 2100],
    ["2019-01-22", 2200],
    ["2019-01-23", 2300],
    ["2019-01-24", 2400],
    ["2019-01-25", 2500],
    ["2019-01-26", 2600],
    ["2019-01-27", 2700],
    ["2019-01-28", 2800],
    ["2019-01-29", 2900],
    ["2019-01-30", 3000],
  ];
  console.log(
    stocksComputed({
      dayCount: 120,
      dayBeforeCount: 60,
      stocks: data,
    }),
  );
  return (
    <>
      <Chart
        chartType="ComboChart"
        width="100%"
        height="400px"
        data={stocksComputed({
          dayCount: 120,
          dayBeforeCount: 45,
          stocks: data,
        })}
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
        }}
      />
      <Chart
        chartType="ColumnChart"
        width="100%"
        height="400px"
        data={volume}
        options={{
          height: 100,
          chartArea: {
            left: "15%",
            width: "70%",
          },
        }}
      />
    </>
  );
}
