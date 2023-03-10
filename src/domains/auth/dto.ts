export type LoginReq = {
  email: string;
  password: string;
};

export const newLoginReq = (): LoginReq => ({
  email: "",
  password: "",
});

export type Token = {
  accessToken: string;
  tokenType: string;
};

export const newToken = (): Token => ({
  tokenType: "",
  accessToken: "",
});
