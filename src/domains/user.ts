export const GeneralUser = "generalUser";
export const Admin = "admin";
export const userTypes = [GeneralUser, Admin] as const;
export type UserType = typeof userTypes[number];

export type User = {
  id: string;
  email: string;
  userType: UserType;
};

export const newUser = (): User => ({
  userType: GeneralUser,
  email: "",
  id: "",
});
