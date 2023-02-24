import { User } from "@/entities/user";

export interface UserAPI {
  findMe(): Promise<User>;
}
