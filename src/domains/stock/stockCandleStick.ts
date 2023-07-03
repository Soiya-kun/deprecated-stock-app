import { StockPrice } from "@/domains/stock/dto";

export const upperMustache = (stock: StockPrice): number =>
  stock.openedPrice > stock.closedPrice
    ? stock.highPrice - stock.openedPrice
    : stock.highPrice - stock.closedPrice;

export const lowerMustache = (stock: StockPrice): number =>
  stock.openedPrice > stock.closedPrice
    ? stock.closedPrice - stock.lowPrice
    : stock.openedPrice - stock.lowPrice;

export const candleStickHeight = (stock: StockPrice): number =>
  Math.abs(stock.openedPrice - stock.closedPrice);

export const ieGreenCandle = (stock: StockPrice): boolean =>
  stock.openedPrice < stock.closedPrice;
