import { User, UserType } from "@/domains/user";

export type UserRes = {
  userId: string;
  email: string;
  userType: string;
};

export const entityFromUserRes = (u: UserRes): User => ({
  id: u.userId,
  userType: u.userType as UserType,
  email: u.email,
});
