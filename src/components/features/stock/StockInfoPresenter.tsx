import { StockInfo } from "@/domains/stock/dto";

type Props = {
  stockInfo: StockInfo;
};

export function StockInfoPresenter({ stockInfo }: Props) {
  return (
    <div>
      <div className="flex flex-col gap-2">
        <div className="mr-4 flex items-center">
          <p className="text-xs">{stockInfo.market}</p>
          <h1 className="mr-4 text-xl font-bold">
            {stockInfo.name}({stockInfo.sc})
          </h1>
          <div className="flex items-end">
            <h2 className="mr-2 text-xl">{stockInfo.closedPrice} 円</h2>
            <p className="mr-2">( {stockInfo.diffFromYesterday} 円</p>
            <p>{stockInfo.diffFromYesterdayPercent} % )</p>
          </div>
        </div>
        <div className="flex gap-4">
          <div>出来高 {stockInfo.recentVolume} 株</div>
          <div>取引高 {stockInfo.transactionPrice * 1000} 円</div>
        </div>
        <div>
          {stockInfo.transactionPrice * 1000 > 1000000000 &&
            "取引高が10億円を超えています"}
        </div>
      </div>
    </div>
  );
}
