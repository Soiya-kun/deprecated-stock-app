import { StockAPI } from "@/usecases/ports/stock";

export const getStocks = async (deps: { api: StockAPI }) =>
  deps.api.getStocks("1234");
