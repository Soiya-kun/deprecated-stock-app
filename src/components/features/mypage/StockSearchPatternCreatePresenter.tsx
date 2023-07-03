import { ChangeEvent } from "react";

import { StockPrice } from "@/domains/stock/dto";
import {
  candleStickHeight,
  ieGreenCandle,
  lowerMustache,
  upperMustache,
} from "@/domains/stock/stockCandleStick";

type Props = {
  prices: StockPrice[];
  max: number;
  handleChangePrice: (
    indexCol: number,
    key: keyof StockPrice,
    e: ChangeEvent<HTMLInputElement>,
  ) => void;
};

export function StockSearchPatternCreatePresenter({
  prices,
  max,
  handleChangePrice,
}: Props) {
  const heightCon = 1500;
  const pricesFixedMax400: StockPrice[] = prices.map(
    (value): StockPrice => ({
      closedPrice: value.closedPrice * (heightCon / max),
      highPrice: value.highPrice * (heightCon / max),
      lowPrice: value.lowPrice * (heightCon / max),
      openedPrice: value.openedPrice * (heightCon / max),
    }),
  );
  return (
    <div className="flex flex-col">
      <div className="mt-20 flex items-start justify-center border border-primary">
        {pricesFixedMax400.map((price) => (
          <div
            className="mr-0.5 flex w-8 flex-col justify-center"
            style={{
              paddingTop: `${heightCon - price.highPrice}px`,
            }}
          >
            <div
              className="mx-auto w-0 border border-gray-200"
              style={{
                height: `${upperMustache(price)}px`,
              }}
            />
            <div
              style={{
                height: `${candleStickHeight(price)}px`,
              }}
              className={`w-8 ${
                ieGreenCandle(price) ? "bg-green-600" : "bg-red-600"
              }`}
            />
            <div
              style={{
                height: `${lowerMustache(price)}px`,
              }}
              className="mx-auto w-0 border border-gray-200"
            />
          </div>
        ))}
      </div>
      <div className="mx-auto flex">
        {prices.map((value, i) => (
          <div className="flex flex-col">
            <input
              className="w-8"
              value={value.highPrice}
              onChange={(e) => handleChangePrice(i, "highPrice", e)}
            />
            {ieGreenCandle(value) ? (
              <>
                <div className="flex">
                  C
                  <input
                    className="w-8"
                    value={value.closedPrice}
                    onChange={(e) => handleChangePrice(i, "closedPrice", e)}
                  />
                </div>
                <div className="flex">
                  O
                  <input
                    className="w-8"
                    value={value.openedPrice}
                    onChange={(e) => handleChangePrice(i, "openedPrice", e)}
                  />
                </div>
              </>
            ) : (
              <>
                <div className="flex">
                  O
                  <input
                    className="w-8"
                    value={value.openedPrice}
                    onChange={(e) => handleChangePrice(i, "openedPrice", e)}
                  />
                </div>
                <div className="flex">
                  C
                  <input
                    className="w-8"
                    value={value.closedPrice}
                    onChange={(e) => handleChangePrice(i, "closedPrice", e)}
                  />
                </div>
              </>
            )}
            <input
              className="w-8"
              value={value.lowPrice}
              onChange={(e) => handleChangePrice(i, "lowPrice", e)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
