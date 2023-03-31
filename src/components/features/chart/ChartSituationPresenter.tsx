import { Result } from "@/domains/ChartSituation/computed";
import { GraphValue } from "@/domains/stock/computed";

type Props = {
  chartData: GraphValue[];
  chartDataWeek: GraphValue[];
  funcs: ((svDay: GraphValue[], svWeek: GraphValue[]) => Result)[];
};

export function ChartSituationPresenter({
  chartData,
  chartDataWeek,
  funcs,
}: Props) {
  const ret = funcs.map((f) => {
    const res = f(chartData, chartDataWeek);
    return res.message === "" ? null : (
      <p
        key={res.message}
        className={`mr-2 rounded-full p-1.5
            ${res.direction === true && "bg-green-400"}
            ${res.direction === false && "bg-red-400"}            
            `}
      >
        {f(chartData, chartDataWeek).message}
      </p>
    );
  });
  return <div className="flex flex-wrap">{ret}</div>;
}