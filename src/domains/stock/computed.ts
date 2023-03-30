import { Stock } from "@/domains/stock/dto";

export type GraphValue = (string | number)[];

const getMa = (stocks: Stock[], index: number, length: number): number => {
  if (index < length) {
    return 0;
  }
  return (
    stocks
      .slice(index - length + 1, index + 1)
      .map((s: Stock) => s.closedPrice)
      .reduce((sum: number, closedPrice: number) => sum + closedPrice) / length
  );
};

const getMaByStockValue = (
  stockValues: GraphValue[],
  index: number,
  length: number,
): number => {
  if (index < length) {
    return 0;
  }
  return (
    stockValues
      .slice(index - length + 1, index + 1)
      .map((s: GraphValue) => Number(s[3]))
      .reduce((sum: number, closedPrice: number) => sum + closedPrice) / length
  );
};

export const stockValueWithMa = (props: { stocks: Stock[] }): GraphValue[] =>
  props.stocks.map((stock: Stock, index: number, array: Stock[]) => {
    const ma5 = getMa(array, index, 5);
    const ma20 = getMa(array, index, 20);
    const ma60 = getMa(array, index, 60);
    return [
      stock.bDate,
      stock.highPrice,
      stock.openedPrice,
      stock.closedPrice,
      stock.lowPrice,
      ma5,
      ma20,
      ma60 === null ? -1 : Math.floor(ma60),
      stock.volume,
    ];
  });

// ["Date", "High", "Open", "Close", "Low", "ma13", "ma26"]
export const stockValueWeekWithMa = (props: {
  stocks: Stock[];
}): GraphValue[] => {
  if (props.stocks.length === 0) {
    return [];
  }
  let volume = 0;
  let highPrice = 0;
  let openedPrice = 0;
  let lowPrice = 99999999999;
  let lastStock: Stock = {} as Stock;
  const firstDateOfMonday = new Date(props.stocks[0].bDate);
  firstDateOfMonday.setDate(
    firstDateOfMonday.getDate() + 1 - firstDateOfMonday.getDay(),
  );
  let res: GraphValue[] = [];
  props.stocks.forEach((stock) => {
    const thisDate = new Date(stock.bDate);
    const diffMilliSec = thisDate.getTime() - firstDateOfMonday.getTime();
    if (diffMilliSec / 1000 / 60 / 60 / 24 >= 5) {
      res.push([
        `${firstDateOfMonday.getFullYear()}-${
          firstDateOfMonday.getMonth() + 1
        }-${firstDateOfMonday.getDate()}`,
        highPrice,
        openedPrice,
        lastStock.closedPrice,
        lowPrice,
        volume,
      ]);
      firstDateOfMonday.setDate(firstDateOfMonday.getDate() + 7);
      volume = 0;
      highPrice = 0;
      openedPrice = 0;
      lowPrice = 99999999999;
    }
    if (stock.highPrice > highPrice) {
      highPrice = stock.highPrice;
    }
    if (stock.highPrice < lowPrice) {
      lowPrice = stock.lowPrice;
    }
    if (openedPrice === 0) {
      openedPrice = stock.openedPrice;
    }
    lastStock = stock;
    volume += stock.volume;
  });
  res.push([
    `${firstDateOfMonday.getFullYear()}-${
      firstDateOfMonday.getMonth() + 1
    }-${firstDateOfMonday.getDate()}`,
    highPrice,
    openedPrice,
    lastStock.closedPrice,
    lowPrice,
    volume,
  ]);

  res = res.map((data: GraphValue, index: number, array: GraphValue[]) =>
    data.concat(getMaByStockValue(array, index, 13)),
  );
  res = res.map((data: GraphValue, index: number, array: GraphValue[]) =>
    data.concat(getMaByStockValue(array, index, 26)),
  );
  return res;
};
