import { Link } from "react-router-dom";

import { appURL } from "@/config/url";

export function MyPage() {
  return (
    <div>
      <h1>マイページ</h1>
      <Link
        to={appURL.todayChart}
        className="w-full rounded-md border-primary p-2"
      >
        本日のチャート
      </Link>
      <Link to={appURL.adminStockAdd}>データ追加</Link>
    </div>
  );
}
