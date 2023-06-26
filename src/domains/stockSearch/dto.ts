export type MaxVolumeInDaysIsOverAverage = {
  day: number;
  overAverage: number;
};

export type PricePattern = {
  priceRank: number;
  openedPriceRank: number;
  highRank: number;
  lowRank: number;
};

export type MaXUpDownPattern = {
  maX: number;
  pattern: boolean[];
};

export type StockSearchPattern = {
  maxVolumeInDaysIsOverAverage: MaxVolumeInDaysIsOverAverage;
  pricePatterns: PricePattern[];
  maXUpDownPatterns: MaXUpDownPattern[];
};
