import { Link } from "react-router-dom";

import { useAuthContext } from "@/components/functionals/AuthContextProvider";
import { useBreakPointContext } from "@/components/functionals/BreakPointContextProvider";
import { HamburgerMenuForPC } from "@/components/layouts/header/HamburgerMenuForPC";
import { HamburgerMenuForPhone } from "@/components/layouts/header/HamburgerMenuForPhone";
import { Logo } from "@/components/ui/icon/Logo";
import { appURL } from "@/config/url";

export function HeaderPresenter() {
  const { showMode } = useBreakPointContext();
  const { isLoggedIn } = useAuthContext();
  return (
    <div className="flex h-16 w-full items-center border-b border-gray-300 bg-secondary text-sm phone:px-4 pc:px-12">
      {showMode === "pc" && (
        <div className="flex w-full items-center justify-between">
          <Link to="/" className="mr-8 block h-12">
            <Logo />
          </Link>
          <div className="flex items-center">
            {!isLoggedIn && (
              <>
                <Link
                  to={appURL.register}
                  className="mr-4 border-r-2 border-gray-700 pr-4"
                >
                  新規会員登録
                </Link>
                <Link className="mr-4" to={appURL.login}>
                  ログイン
                </Link>
              </>
            )}
            <HamburgerMenuForPC />
          </div>
        </div>
      )}
      {showMode === "phone" && (
        <div className="flex w-full items-center justify-between">
          <HamburgerMenuForPhone />
          <Link to="/" className="mr-2 h-12">
            <Logo />
          </Link>
        </div>
      )}
    </div>
  );
}
