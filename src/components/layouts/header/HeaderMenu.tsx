import { Link } from "react-router-dom";

import { Card } from "@/components/ui/Card";
import { TitleSmall } from "@/components/ui/TitleSmall";

type Props = {
  className?: string;
};

// Figma ヘッダーメニュー
export function HeaderMenu({ className = "" }: Props) {
  return (
    <Card className={`py-4 ${className}`}>
      <TitleSmall label="" className="px-4" />
      <Link to="/">
        <p className="cursor-pointer px-4 py-0.5 text-gray-400 hover:bg-gray-100">
          保存したチャート
        </p>
      </Link>
      <Link to="/">
        <p className="cursor-pointer px-4 py-0.5 text-gray-400 hover:bg-gray-100">
          保存した条件
        </p>
      </Link>
    </Card>
  );
}
