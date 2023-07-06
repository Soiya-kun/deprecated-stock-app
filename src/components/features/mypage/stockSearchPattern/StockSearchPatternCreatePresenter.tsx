import { ChangeEvent } from "react";
import { AiOutlinePlusCircle } from "react-icons/all";

import { StockPriceSearchForm } from "@/components/features/mypage/stockSearchPattern/form";
import { StockPrice } from "@/domains/stock/dto";
import {
  candleStickHeight,
  ieGreenCandle,
  lowerMustache,
  upperMustache,
} from "@/domains/stock/stockCandleStick";

type Props = {
  prices: StockPriceSearchForm[];
  max: number;
  handleChangePrice: (
    indexCol: number,
    key: keyof StockPriceSearchForm,
    e: ChangeEvent<HTMLInputElement>,
  ) => void;
  handleClickAddButton: () => void;
};

export function StockSearchPatternCreatePresenter({
  prices,
  max,
  handleChangePrice,
  handleClickAddButton,
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
      <div className="mt-20 flex items-start justify-center">
        {pricesFixedMax400.map((price) => (
          <div
            className="mr-0.5 flex w-8 flex-col justify-center"
            style={{
              paddingTop: `${heightCon - price.highPrice}px`,
            }}
          >
            <div
              className="mx-auto w-0 border border-gray-600"
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
              className="mx-auto w-0 border border-gray-600"
            />
          </div>
        ))}
        <div className="w-20" />
      </div>
      <div className="mx-auto flex w-max items-center">
        {prices.map((value, i) => (
          <div className="flex w-max flex-col items-end justify-end">
            <input
              className="w-8"
              type="number"
              value={value.highPrice}
              onChange={(e) => handleChangePrice(i, "highPrice", e)}
            />
            {ieGreenCandle(value) ? (
              <>
                <div className="flex">
                  C
                  <input
                    className="w-8"
                    type="number"
                    value={value.closedPrice}
                    onChange={(e) => handleChangePrice(i, "closedPrice", e)}
                  />
                </div>
                <div className="flex">
                  O
                  <input
                    className="w-8"
                    type="number"
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
                    type="number"
                    value={value.openedPrice}
                    onChange={(e) => handleChangePrice(i, "openedPrice", e)}
                  />
                </div>
                <div className="flex">
                  C
                  <input
                    className="w-8"
                    type="number"
                    value={value.closedPrice}
                    onChange={(e) => handleChangePrice(i, "closedPrice", e)}
                  />
                </div>
              </>
            )}
            <input
              className="w-8"
              type="number"
              value={value.lowPrice}
              onChange={(e) => handleChangePrice(i, "lowPrice", e)}
            />
            {/* bool */}
            <div className="mx-auto flex h-6 items-center">
              <input
                className="w-8"
                type="checkbox"
                checked={value.isClosedPointMatchRank}
                onChange={(e) =>
                  handleChangePrice(i, "isClosedPointMatchRank", e)
                }
              />
            </div>
            <div className="mx-auto flex h-6 items-center">
              <input
                className="w-8"
                type="checkbox"
                checked={value.isClosedPointOver}
                onChange={(e) => handleChangePrice(i, "isClosedPointOver", e)}
              />
            </div>
          </div>
        ))}
        <div className="w-20">
          <AiOutlinePlusCircle
            className="ml-4 cursor-pointer"
            onClick={handleClickAddButton}
          />
        </div>
      </div>
    </div>
  );
}
