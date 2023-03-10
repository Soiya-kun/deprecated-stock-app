import { User } from "@/domains/user";

export interface UserAPI {
  findMe(): Promise<User>;
}
