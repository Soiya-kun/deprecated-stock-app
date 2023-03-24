import { Chart } from "react-google-charts";

import { mockStock } from "@/adapters/api/stock/mock";
import { stockValueWithMa, stockVolumes } from "@/domains/stock/computed";
import { Stock } from "@/domains/stock/dto";

export function TopPage() {
  let prev = 500;
  const data: Stock[] = Array(120)
    .fill(0)
    .map((_, i) => {
      const ret = mockStock(i, prev);
      prev = ret.closedPrice;
      return ret;
    });
  return (
    <>
      <Chart
        chartType="ComboChart"
        width="100%"
        height="400px"
        data={stockValueWithMa({
          dayCount: 2000,
          dayBeforeCount: 0,
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
        data={stockVolumes({
          dayCount: 120,
          dayBeforeCount: 45,
          stocks: data,
        })}
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
