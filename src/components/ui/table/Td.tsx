import { ReactNode } from "react";

type Props = {
  /** セルの内容 */
  children?: ReactNode;
  /** コンポーネントに適用するクラス名 */
  className?: string;
};

export function Td({ className = "", children }: Props) {
  return <td className={`py-2 px-4 ${className}`}>{children}</td>;
}
