import { Result } from "@/domains/ChartSituation/computed";
import { GraphValue } from "@/domains/stock/computed";

type Props = {
  className?: string;
  chartData: GraphValue[];
  chartDataWeek: GraphValue[];
  funcs: ((svDay: GraphValue[], svWeek: GraphValue[]) => Result)[];
};

export function ChartSituationPresenter({
  className = "",
  chartData,
  chartDataWeek,
  funcs,
}: Props) {
  const ret = funcs.map((f, i) => {
    const res = f(chartData, chartDataWeek);
    return res.message === "" ? null : (
      <p
        key={`chartSituation${String(i)}`}
        className={`mt-2 mr-2 rounded-full p-1.5
            ${res.direction === true && "bg-green-500"}
            ${res.direction === false && "bg-red-500"}            
            `}
      >
        {f(chartData, chartDataWeek).message}
      </p>
    );
  });
  return <div className={`flex flex-wrap ${className}`}>{ret}</div>;
}
