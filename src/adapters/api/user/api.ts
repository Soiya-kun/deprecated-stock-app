import axios from "axios";

import { entityFromUserRes, UserRes } from "@/adapters/api/user/schema";
import { User } from "@/domains/user";
import { UserAPI } from "@/usecases/ports/user";

const uri = "user";

export const useUserAPI = (): UserAPI => ({
  findMe: async (): Promise<User> => {
    const ret = await axios.get<UserRes>(`${uri}/me`);
    return entityFromUserRes(ret.data);
  },
});
