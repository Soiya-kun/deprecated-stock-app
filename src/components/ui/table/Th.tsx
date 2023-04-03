import { ReactNode } from "react";

type Props = {
  /** セルの内容 */
  children?: ReactNode;
  /** コンポーネントに適用するクラス名 */
  className?: string;
  /** セルをクリックした時に発火するコールバック関数 */
  onClick?: () => void;
};

export function Th({ className = "", children, onClick }: Props) {
  return (
    <th
      className={`py-2 px-4 font-bold text-gray-800 ${className}`}
      onClick={onClick}
    >
      {children}
    </th>
  );
}
