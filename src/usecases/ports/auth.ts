import { LoginReq, Token } from "@/domains/auth/dto";

export interface AuthAPI {
  accessToken(loginReq: LoginReq): Promise<Token>;

  resetPassword(email: string): Promise<void>;

  changePassword(resetId: string, newPassword: string): Promise<void>;
}

export interface Auth {
  saveTokenToCache(token: Token): void;

  getTokenFromCache(): Token;

  resetTokenInCache(): void;
}
