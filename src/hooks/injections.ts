import { useAuthApi } from "@/adapters/api/auth/api";
import { useStockAPI } from "@/adapters/api/stock/api";
import { useUserAPI } from "@/adapters/api/user/api";
import { useAuthDriverForAxios } from "@/adapters/auth/auth";
import { LoginReq } from "@/domains/auth/dto";
import { StockCreate } from "@/domains/stock/dto";
import { StockSearchPattern } from "@/domains/stockSearch/dto";
import { getTokenInCache, login, logout } from "@/usecases/auth";
import {
  createStocks,
  createStockSplit,
  getStockCodes,
  getStockCodesSaved,
  getStocks,
  getStocksByRandom,
  saveSearchStockPattern,
  saveStockCode,
} from "@/usecases/stock";
import { findMe } from "@/usecases/user";

// Auth
export const useLogin = () => {
  const deps = {
    api: useAuthApi(),
    auth: useAuthDriverForAxios(),
  };
  return (loginReq: LoginReq) => login(deps, loginReq);
};

export const useLogout = () => {
  const deps = {
    auth: useAuthDriverForAxios(),
  };
  return () => logout(deps);
};

export const useGetTokenInCache = () => {
  const deps = {
    auth: useAuthDriverForAxios(),
  };
  return () => getTokenInCache(deps);
};

// User
export const useFindMe = () => {
  const deps = {
    api: useUserAPI(),
  };
  return () => findMe(deps);
};

// stock
export const useGetStocks = () => {
  const deps = {
    api: useStockAPI(),
  };
  return (code: string) => getStocks(deps, code);
};

export const useGetStocksByRandom = () => {
  const deps = {
    api: useStockAPI(),
  };
  return () => getStocksByRandom(deps);
};

export const useSaveStockCode = () => {
  const deps = {
    api: useStockAPI(),
  };
  return (stockCode: string) => saveStockCode(deps, stockCode);
};

export const useGetStockCodes = () => {
  const deps = {
    api: useStockAPI(),
  };
  return () => getStockCodes(deps);
};

export const useGetSavedStockCodes = () => {
  const deps = {
    api: useStockAPI(),
  };
  return () => getStockCodesSaved(deps);
};

export const useCreateStock = () => {
  const deps = {
    api: useStockAPI(),
  };
  return (stocks: StockCreate[]) => createStocks(deps, stocks);
};

export const useCreateStockSplit = () => {
  const deps = {
    api: useStockAPI(),
  };
  return (stockSplit: { stockCode: string; date: Date; splitRatio: number }) =>
    createStockSplit(deps, stockSplit);
};

export const useSaveSearchStockPattern = () => {
  const deps = {
    api: useStockAPI(),
  };
  return (pattern: StockSearchPattern) => saveSearchStockPattern(deps, pattern);
};
