import { ReactNode } from "react";

type Props = {
  /** テーブルの内容 */
  children?: ReactNode;
  /** コンポーネントに適用するクラス名 */
  className?: string;
};

export function Table({ children, className = "" }: Props) {
  return <table className={`text-gray-600 ${className}`}>{children}</table>;
}
