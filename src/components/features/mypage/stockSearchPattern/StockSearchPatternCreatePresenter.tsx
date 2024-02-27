import { ChangeEvent } from "react";
import { AiOutlinePlusCircle } from "react-icons/all";

import { StockPriceSearchForm } from "@/components/features/mypage/stockSearchPattern/form";
import { ButtonWithError } from "@/components/ui/ButtonWithError";
import { ThreeChoicesCheckButton } from "@/components/ui/ThreeChoicesCheckButton";
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
  handleChangeBool: (
    indexCol: number,
    key: keyof StockPriceSearchForm,
    value: boolean | undefined,
  ) => void;
  handleClickAddButton: () => void;
  handleClickSubmitButton: () => void;
};

export function StockSearchPatternCreatePresenter({
  prices,
  max,
  handleChangePrice,
  handleChangeBool,
  handleClickAddButton,
  handleClickSubmitButton,
}: Props) {
  const heightCon = 400;
  const pricesFixedMax400: StockPrice[] = prices.map(
    (value): StockPrice => ({
      closedPrice: value.closedPrice * (heightCon / max),
      highPrice: value.highPrice * (heightCon / max),
      lowPrice: value.lowPrice * (heightCon / max),
      openedPrice: value.openedPrice * (heightCon / max),
    }),
  );
  return (
    <div className="flex flex-col justify-center">
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
      <div className="flex items-center justify-center">
        <div className="flex w-max max-w-4xl items-center overflow-x-auto">
          {prices.map((value, i) => (
            <div className="mr-2 flex w-max flex-col items-end justify-end">
              <div className="flex h-6 items-center">
                <p className="w-16" />
                <p className="w-8 text-center">MR</p>
                <p className="w-8 text-center">OV</p>
              </div>
              <div className="flex h-6 items-center">
                <input
                  className="w-16 text-right"
                  type="number"
                  value={value.highPrice}
                  onChange={(e) => handleChangePrice(i, "highPrice", e)}
                />
                <input
                  className="w-8"
                  type="checkbox"
                  checked={value.isHighPointMatchRank}
                  onChange={(e) =>
                    handleChangePrice(i, "isHighPointMatchRank", e)
                  }
                />
                <ThreeChoicesCheckButton
                  className="w-8"
                  handleClick={(bool) =>
                    handleChangeBool(i, "isHighPointOver", bool)
                  }
                  value={value.isHighPointOver}
                />
              </div>
              {ieGreenCandle(value) ? (
                <>
                  <div className="flex h-6 items-center">
                    C
                    <input
                      className="w-16 text-right"
                      type="number"
                      value={value.closedPrice}
                      onChange={(e) => handleChangePrice(i, "closedPrice", e)}
                    />
                    <input
                      className="w-8"
                      type="checkbox"
                      checked={value.isClosedPointMatchRank}
                      onChange={(e) =>
                        handleChangePrice(i, "isClosedPointMatchRank", e)
                      }
                    />
                    <ThreeChoicesCheckButton
                      className="w-8"
                      handleClick={(bool) =>
                        handleChangeBool(i, "isClosedPointOver", bool)
                      }
                      value={value.isClosedPointOver}
                    />
                  </div>
                  <div className="flex items-center">
                    O
                    <input
                      className="w-16 text-right"
                      type="number"
                      value={value.openedPrice}
                      onChange={(e) => handleChangePrice(i, "openedPrice", e)}
                    />
                    <input
                      className="w-8"
                      type="checkbox"
                      checked={value.isOpenedPointMatchRank}
                      onChange={(e) =>
                        handleChangePrice(i, "isOpenedPointMatchRank", e)
                      }
                    />
                    <ThreeChoicesCheckButton
                      className="w-8"
                      handleClick={(bool) =>
                        handleChangeBool(i, "isOpenedPointOver", bool)
                      }
                      value={value.isOpenedPointOver}
                    />
                  </div>
                </>
              ) : (
                <>
                  <div className="flex items-center">
                    O
                    <input
                      className="w-16 text-right"
                      type="number"
                      value={value.openedPrice}
                      onChange={(e) => handleChangePrice(i, "openedPrice", e)}
                    />
                    <input
                      className="w-8"
                      type="checkbox"
                      checked={value.isOpenedPointMatchRank}
                      onChange={(e) =>
                        handleChangePrice(i, "isOpenedPointMatchRank", e)
                      }
                    />
                    <ThreeChoicesCheckButton
                      className="w-8"
                      handleClick={(bool) =>
                        handleChangeBool(i, "isOpenedPointOver", bool)
                      }
                      value={value.isOpenedPointOver}
                    />
                  </div>
                  <div className="flex items-center">
                    C
                    <input
                      className="w-16 text-right"
                      type="number"
                      value={value.closedPrice}
                      onChange={(e) => handleChangePrice(i, "closedPrice", e)}
                    />
                    <input
                      className="w-8"
                      type="checkbox"
                      checked={value.isClosedPointMatchRank}
                      onChange={(e) =>
                        handleChangePrice(i, "isClosedPointMatchRank", e)
                      }
                    />
                    <ThreeChoicesCheckButton
                      className="w-8"
                      handleClick={(bool) =>
                        handleChangeBool(i, "isClosedPointOver", bool)
                      }
                      value={value.isClosedPointOver}
                    />
                  </div>
                </>
              )}
              <div className="flex items-center">
                <input
                  className="w-16 text-right"
                  type="number"
                  value={value.lowPrice}
                  onChange={(e) => handleChangePrice(i, "lowPrice", e)}
                />
                <input
                  className="w-8"
                  type="checkbox"
                  checked={value.isLowPointMatchRank}
                  onChange={(e) =>
                    handleChangePrice(i, "isLowPointMatchRank", e)
                  }
                />
                <ThreeChoicesCheckButton
                  className="w-8"
                  handleClick={(bool) =>
                    handleChangeBool(i, "isLowPointOver", bool)
                  }
                  value={value.isLowPointOver}
                />
              </div>
            </div>
          ))}
        </div>
        <div className="w-20">
          <AiOutlinePlusCircle
            className="ml-4 cursor-pointer"
            onClick={handleClickAddButton}
          />
        </div>
      </div>
      <ButtonWithError
        onClick={handleClickSubmitButton}
        variant="primary"
        className="mx-auto"
      >
        登録する
      </ButtonWithError>
    </div>
  );
}
