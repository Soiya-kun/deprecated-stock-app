import { GeneralUser, User } from "@/entities/user";
import { UserAPI } from "@/usecases/ports/user";

export const useInMemoryUserAPI = (): UserAPI => ({
  findMe: async (): Promise<User> => {
    // 認証の待機のシミュレーションのためwait
    const wait = (ms: number) =>
      // eslint-disable-next-line no-promise-executor-return
      new Promise((resolve) => setTimeout(resolve, ms));
    await wait(2000);
    return {
      userType: GeneralUser,
      id: "mock",
    };
  },
});
