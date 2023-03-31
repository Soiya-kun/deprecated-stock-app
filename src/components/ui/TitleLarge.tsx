import { ReactNode } from "react";

type Props = {
  label: string | ReactNode;
  className?: string;
};

export function TitleLarge({ label, className }: Props) {
  return (
    <h1
      className={`font-bold text-primary phone:text-xl pc:text-2xl ${className}`}
    >
      {label}
    </h1>
  );
}
