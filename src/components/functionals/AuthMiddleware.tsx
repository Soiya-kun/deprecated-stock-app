import { useContext, useEffect } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";

import {
  AuthContext,
  AuthContextType,
} from "@/components/functionals/AuthContextProvider";
import { SixDotsScaleMiddle } from "@/components/ui/SixdotsScaleMiddle";
import { appURL } from "@/config/url";
import { useFindMeHook } from "@/hooks/findMe";

/**
 * @param {AuthContextType} auth ログインユーザーのauth情報
 * @param {string} locationPathNameTo 遷移しようとしているパス
 * @returns {Object}  最終的に遷移して良いパスと、認可の結果を返す
 */
export const authorize = (
  auth: AuthContextType,
  locationPathNameTo: string,
): { locationPathNameTo: string; isAuthorized: boolean } => {
  const freeAccess = [appURL.login];
  if (
    locationPathNameTo === appURL.home ||
    (freeAccess.some((path) => locationPathNameTo.startsWith(path)) &&
      !auth.isLoggedIn)
  ) {
    return { locationPathNameTo, isAuthorized: true };
  }

  // freeAccess以外はログイン必須
  if (!auth.isLoggedIn) {
    return { locationPathNameTo: appURL.login, isAuthorized: false };
  }

  const userAccess = [appURL.home, appURL.myPage, appURL.adminStockAdd];
  if (userAccess.some((path) => locationPathNameTo.startsWith(path))) {
    return { locationPathNameTo, isAuthorized: true };
  }

  return { locationPathNameTo: appURL.login, isAuthorized: false };
};

export function AuthMiddleware() {
  const [auth] = useContext(AuthContext);

  const { findMe } = useFindMeHook();
  useEffect(() => {
    findMe();
  }, []);

  const location = useLocation();
  // 認可にuser情報が必要なため、findMeの終了を待つ
  if (auth.isFindingMeNow) {
    return (
      <div className="flex h-screen w-screen items-center justify-center">
        <SixDotsScaleMiddle />
      </div>
    );
  }

  const authRes = authorize(auth, location.pathname);
  if (!authRes.isAuthorized) {
    return <Navigate to={authRes.locationPathNameTo} />;
  }
  return <Outlet />;
}
