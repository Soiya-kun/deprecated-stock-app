import { Stock } from "@/domains/stock/dto";

export const stockValueWithMa = (props: {
  dayCount: number;
  dayBeforeCount: number;
  stocks: Stock[];
}): (string | number | null | Date)[][] => {
  const newDayCount = props.dayCount < 0 ? 1 : props.dayCount;
  const newDayBeforeCount = props.dayBeforeCount < 0 ? 0 : props.dayBeforeCount;
  const ret: (string | number | null | Date)[][] = props.stocks
    .map((stock: Stock, index: number, array: Stock[]) => {
      let ma5: number | null = null;
      if (index >= 5) {
        ma5 =
          array
            .slice(index - 4, index + 1)
            .map((s: Stock) => s.closedPrice)
            .reduce((sum: number, closedPrice: number) => sum + closedPrice) /
          5;
      }
      let ma20: number | null = null;
      if (index >= 20) {
        ma20 =
          array
            .slice(index - 19, index + 1)
            .map((s: Stock) => s.closedPrice)
            .reduce((sum: number, closedPrice: number) => sum + closedPrice) /
          20;
      }
      let ma60: number | null = null;
      if (index >= 60) {
        ma60 =
          array
            .slice(index - 59, index + 1)
            .map((s: Stock) => s.closedPrice)
            .reduce((sum: number, closedPrice: number) => sum + closedPrice) /
          60;
      }
      return [
        new Date(stock.bDate),
        stock.highPrice,
        stock.openedPrice,
        stock.closedPrice,
        stock.lowPrice,
        ma5,
        ma20,
        ma60 === null ? -1 : Math.floor(ma60),
      ];
    })
    .slice(
      props.stocks.length - newDayCount + newDayBeforeCount,
      props.stocks.length + newDayBeforeCount,
    );
  ret.unshift(["Date", "High", "Open", "Close", "Low", "ma5", "ma20", "ma60"]);
  return ret;
};

export const stockVolumes = (props: {
  dayCount: number;
  dayBeforeCount: number;
  stocks: Stock[];
}): (string | number | null | Date)[][] => {
  const newDayCount = props.dayCount < 0 ? 1 : props.dayCount;
  const newDayBeforeCount = props.dayBeforeCount < 0 ? 0 : props.dayBeforeCount;
  const ret: (string | number | null | Date)[][] = props.stocks
    .map((stock: Stock) => [new Date(stock.bDate), stock.volume])
    .slice(
      props.stocks.length - newDayCount + newDayBeforeCount,
      props.stocks.length + newDayBeforeCount,
    );
  ret.unshift(["Date", "Volume"]);
  return ret;
};
