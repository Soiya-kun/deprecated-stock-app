import { Link } from "react-router-dom";

import { appURL } from "@/config/url";

export function MyPage() {
  return (
    <div className="flex flex-col space-y-2">
      <h1>マイページ</h1>
      <Link to={appURL.todayChart}>本日のチャート</Link>
      <Link to={appURL.adminStockAdd}>データ追加</Link>
      <Link to={appURL.adminStockSplitAdd}>株式分割追加</Link>
      <Link to={appURL.myPageSaveSearchStockPattern}>株式の検索条件保存</Link>
    </div>
  );
}
