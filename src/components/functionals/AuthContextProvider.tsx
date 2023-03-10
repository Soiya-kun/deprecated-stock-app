import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useEffect,
  useMemo,
  useState,
} from "react";

import { newToken, Token } from "@/domains/auth";
import { newUser, User } from "@/domains/user";
import { useFindMe, useGetTokenInCache } from "@/hooks/injections";

export type AuthContextType = {
  isLoggedIn: boolean;
  token: Token;
  user: User;
  isFindingMeNow: boolean;
};

export const AuthContext = createContext<
  [AuthContextType, Dispatch<SetStateAction<AuthContextType>>]
>([{} as AuthContextType, () => {}]);

type Props = {
  children: ReactNode;
};

export function AuthContextProvider({ children }: Props) {
  // cacheされたトークンをcontextに保持する
  const GetTokenInCache = useGetTokenInCache();
  const cachedToken = GetTokenInCache();

  const [auth, setAuth] = useState<AuthContextType>({
    isFindingMeNow: true,
    isLoggedIn: false,
    token: cachedToken,
    user: newUser(),
  });
  const authMemo: [AuthContextType, Dispatch<SetStateAction<AuthContextType>>] =
    useMemo(() => [auth, setAuth], [auth]);

  // findMe
  const findMe = async () => {
    let me = newUser();
    let isLoggedIn = true;
    const find = useFindMe();
    try {
      me = await find();
    } catch (e) {
      isLoggedIn = false;
    }
    setAuth({
      isFindingMeNow: false,
      isLoggedIn,
      token: isLoggedIn ? auth.token : newToken(),
      user: me,
    });
  };

  useEffect(() => {
    findMe();
  }, []);

  return (
    <AuthContext.Provider value={authMemo}>{children}</AuthContext.Provider>
  );
}
