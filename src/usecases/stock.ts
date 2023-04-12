import { StockAPI } from "@/usecases/ports/stock";

export const getStocks = async (deps: { api: StockAPI }, code: string) =>
  deps.api.getStocks(code);

export const getStockCodes = async (deps: { api: StockAPI }) =>
  deps.api.getStockCodes();
