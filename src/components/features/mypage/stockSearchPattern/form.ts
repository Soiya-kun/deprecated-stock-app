import { StockPrice } from "@/domains/stock/dto";

export type StockPriceSearchForm = StockPrice & {
  isClosedPointOver: boolean | undefined;
  isClosedPointMatchRank: boolean;
  isOpenedPointOver: boolean | undefined;
  isOpenedPointMatchRank: boolean;
  isHighPointOver: boolean | undefined;
  isHighPointMatchRank: boolean;
  isLowPointOver: boolean | undefined;
  isLowPointMatchRank: boolean;
};
