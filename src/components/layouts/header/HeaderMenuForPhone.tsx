import { AiOutlineRight, CgClose } from "react-icons/all";
import { Link } from "react-router-dom";

import { appURL } from "@/config/url";

type Props = {
  handleClickOnCloseButton: () => void;
};

const LINKS = [
  {
    label: "マイページ",
    to: appURL.login,
  },
] as const;

// Figma ヘッダーメニュー
export function HeaderMenuForPhone({ handleClickOnCloseButton }: Props) {
  return (
    <div className="absolute top-0 left-0 h-screen w-screen bg-gray-300 bg-opacity-20">
      <div className="h-full w-72 bg-white">
        <div className="flex w-full justify-end p-2">
          <CgClose
            className="h-6 w-6 cursor-pointer"
            onClick={handleClickOnCloseButton}
          />
        </div>
        <div className="flex border-b border-gray-300 pb-2">
          <Link className="flex w-1/2 justify-end font-bold" to={appURL.login}>
            <p className="mx-auto w-max">ログイン</p>
          </Link>
          <div className="border-r-2 border-gray-300" />
          <Link className="flex w-1/2 font-bold" to={appURL.register}>
            <p className="mx-auto w-max">新規会員登録</p>
          </Link>
        </div>
        {LINKS.map((link) => (
          <Link
            key={link.to}
            to={link.to}
            className="flex items-center justify-between border-b border-gray-300 p-2"
          >
            <p className="text-gray-400">{link.label}</p>
            <AiOutlineRight className="h-4 w-4" />
          </Link>
        ))}
      </div>
    </div>
  );
}
