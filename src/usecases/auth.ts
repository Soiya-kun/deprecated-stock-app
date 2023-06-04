import { LoginReq, Token } from "@/domains/auth/dto";
import { Auth, AuthAPI } from "@/usecases/ports/auth";

export const login = async (
  deps: {
    api: AuthAPI;
    auth: Auth;
  },
  loginReq: LoginReq,
): Promise<Token> => {
  const token = await deps.api.accessToken(loginReq);
  deps.auth.saveTokenToCache(token);
  return token;
};

export const logout = async (deps: { auth: Auth }): Promise<void> => {
  await deps.auth.resetTokenInCache();
};

export const getTokenInCache = (deps: { auth: Auth }): Token =>
  deps.auth.getTokenFromCache();
