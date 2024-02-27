import { StockCreate } from "@/domains/stock/dto";
import { StockSearchPattern } from "@/domains/stockSearch/dto";
import { StockSplit } from "@/domains/stockSplit/dto";
import { StockAPI } from "@/usecases/ports/stock";

export const getStocks = async (deps: { api: StockAPI }, code: string) =>
  deps.api.getStocks(code);

export const getStocksByRandom = async (deps: { api: StockAPI }) =>
  deps.api.getStocksByRandom();

export const getStockCodes = async (deps: { api: StockAPI }) =>
  deps.api.getStockCodes();

export const createStocks = async (
  deps: { api: StockAPI },
  stocks: StockCreate[],
) => deps.api.createStocks(stocks);

export const createStockSplit = async (
  deps: { api: StockAPI },
  stockSplit: StockSplit,
) => deps.api.createStockSplit(stockSplit);

export const saveSearchStockPattern = async (
  deps: { api: StockAPI },
  searchStockPattern: StockSearchPattern,
) => deps.api.saveSearchStockPattern(searchStockPattern);

export const saveStockCode = async (
  deps: { api: StockAPI },
  stockCode: string,
) => deps.api.saveStockCode(stockCode);
