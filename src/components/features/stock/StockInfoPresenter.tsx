import { StockInfo } from "@/domains/stock/dto";

type Props = {
  stockInfo: StockInfo;
};

export function StockInfoPresenter({ stockInfo }: Props) {
  return (
    <div>
      <div className="flex items-end">
        <div className="mr-4">
          <p className="text-xs">{stockInfo.market}</p>
          <h1 className="text-xl font-bold">
            {stockInfo.name}({stockInfo.sc})
          </h1>
        </div>
        <div className="flex items-center">
          <h2 className="mr-2 text-xl">{stockInfo.closedPrice} 円</h2>
          <p className="mr-2">( {stockInfo.diffFromYesterday} 円</p>
          <p>{stockInfo.diffFromYesterdayPercent} % )</p>
        </div>
      </div>
    </div>
  );
}
