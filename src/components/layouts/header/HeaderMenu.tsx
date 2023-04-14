import { Link } from "react-router-dom";

import { useAuthContext } from "@/components/functionals/AuthContextProvider";
import { Card } from "@/components/ui/Card";
import { TitleSmall } from "@/components/ui/TitleSmall";
import { appURL } from "@/config/url";

type Props = {
  className?: string;
};

// Figma ヘッダーメニュー
export function HeaderMenu({ className = "" }: Props) {
  const auth = useAuthContext();
  return (
    <Card className={`py-4 ${className}`}>
      <TitleSmall label="" className="px-4" />
      {!auth.isLoggedIn ? (
        <Link to="/login">
          <p className="cursor-pointer px-4 py-0.5 text-gray-400 hover:bg-gray-100">
            ログイン
          </p>
        </Link>
      ) : (
        <>
          <Link to="/chart/saved">
            <p className="cursor-pointer px-4 py-0.5 text-gray-400 hover:bg-gray-100">
              保存したチャート
            </p>
          </Link>
          <Link to="/condition/saved">
            <p className="cursor-pointer px-4 py-0.5 text-gray-400 hover:bg-gray-100">
              保存した条件
            </p>
          </Link>
          <Link to={appURL.todayChart}>
            <p className="cursor-pointer px-4 py-0.5 text-gray-400 hover:bg-gray-100">
              本日のチャート
            </p>
          </Link>
        </>
      )}
    </Card>
  );
}
