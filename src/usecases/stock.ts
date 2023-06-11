import { StockCreate } from "@/domains/stock/dto";
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
