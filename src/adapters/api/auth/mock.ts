import { Token } from "@/domains/auth/dto";
import { AuthAPI } from "@/usecases/ports/auth";

export const useMockAuthAPI = (): AuthAPI => ({
  accessToken: async (): Promise<Token> => ({
    accessToken: "mock",
    tokenType: "Bearer",
  }),
  changePassword: async () => Promise.resolve(undefined),
  resetPassword: async () => Promise.resolve(undefined),
});
