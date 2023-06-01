import axios from "axios";

import { LoginReq, Token } from "@/domains/auth/dto";
import { AuthAPI } from "@/usecases/ports/auth";

const uri = "auth";

export const useAuthApi = (): AuthAPI => ({
  async accessToken(loginReq: LoginReq): Promise<Token> {
    const ret = await axios.post<Token>(`${uri}/access-token`, loginReq);
    return ret.data;
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  changePassword(resetId: string, newPassword: string): Promise<void> {
    return Promise.resolve(undefined);
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  resetPassword(email: string): Promise<void> {
    return Promise.resolve(undefined);
  },
});
