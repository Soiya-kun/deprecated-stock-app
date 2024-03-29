import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useMemo,
  useState,
} from "react";

import { Token } from "@/domains/auth/dto";
import { newUser, User } from "@/domains/user";
import { useGetTokenInCache } from "@/hooks/injections";

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

  return (
    <AuthContext.Provider value={authMemo}>{children}</AuthContext.Provider>
  );
}

export const useAuthContext = () => {
  const [auth, setAuth] = useContext(AuthContext);
  return { auth, setAuth };
};
