import { MouseEventHandler, ReactNode } from "react";

type Props = {
  /** セルの内容 */
  children?: ReactNode;
  /** コンポーネントに適用するクラス名 */
  className?: string;
  onClick?: MouseEventHandler<HTMLTableRowElement>;
};

export function Tr({ className = "", children, onClick }: Props) {
  return (
    <tr onClick={onClick} className={`border-b border-gray-200 ${className}`}>
      {children}
    </tr>
  );
}
