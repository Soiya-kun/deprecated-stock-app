import { StockPrice } from "@/domains/stock/dto";

export type VolumePattern = {
  volumePoint: number;
  isOver: boolean;
  isMatchRank: boolean;
};

export type PricePattern = StockPrice & {
  isClosedPointOver: boolean | undefined;
  isClosedPointMatchRank: boolean;
  isOpenedPointOver: boolean | undefined;
  isOpenedPointMatchRank: boolean;
  isHighPointOver: boolean | undefined;
  isHighPointMatchRank: boolean;
  isLowPointOver: boolean | undefined;
  isLowPointMatchRank: boolean;
};

export type MaXUpDownPattern = {
  maX: number;
  pattern: boolean[];
};

export type StockSearchPattern = {
  volumePatterns: VolumePattern[];
  pricePatterns: PricePattern[];
  maXUpDownPatterns: MaXUpDownPattern[];
};
