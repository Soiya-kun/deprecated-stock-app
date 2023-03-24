import { useMockAuthAPI } from "@/adapters/api/auth/mock";
import { useMockStockAPI } from "@/adapters/api/stock/mock";
import { useInMemoryUserAPI } from "@/adapters/api/user/mock";
import { useAuthDriverForAxios } from "@/adapters/auth/auth";
import { LoginReq, Token } from "@/domains/auth/dto";
import { login } from "@/usecases/auth";
import { findMe } from "@/usecases/user";

// Auth
export const useLogin = () => {
  const deps = {
    api: useMockAuthAPI(),
    auth: useAuthDriverForAxios(),
  };
  return (loginReq: LoginReq) => login(deps, loginReq);
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
    api: useMockStockAPI(),
  };
  return () => deps.api.getStocks("1234");
};
