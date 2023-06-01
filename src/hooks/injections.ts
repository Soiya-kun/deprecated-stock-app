import { useAuthApi } from "@/adapters/api/auth/api";
import { useStockAPI } from "@/adapters/api/stock/api";
import { useMockStockAPI } from "@/adapters/api/stock/mock";
import { useInMemoryUserAPI } from "@/adapters/api/user/mock";
import { useAuthDriverForAxios } from "@/adapters/auth/auth";
import { LoginReq, Token } from "@/domains/auth/dto";
import { login, logout } from "@/usecases/auth";
import { getStockCodes, getStocks, getStocksByRandom } from "@/usecases/stock";
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

export const useGetTokenInCache = (): (() => Token) => () => ({
  tokenType: "Bearer",
  accessToken: "mockToken",
});

export const useSaveTokenToCache = () => {
  const deps = {
    auth: useAuthDriverForAxios(),
  };
  return (token: Token) => deps.auth.saveTokenToCache(token);
};
// User
export const useFindMe = () => {
  const deps = {
    api: useInMemoryUserAPI(),
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

export const useGetStockCodes = () => {
  const deps = {
    api: useMockStockAPI(),
  };
  return () => getStockCodes(deps);
};
