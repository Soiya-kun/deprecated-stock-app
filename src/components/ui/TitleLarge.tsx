import { ReactNode } from "react";

type Props = {
  label: string | ReactNode;
  className?: string;
};

export function TitleLarge({ label, className }: Props) {
  return (
    <h1
      className={`ph-in:text-xl ph-out:text-2xl font-bold text-primary ${className}`}
    >
      {label}
    </h1>
  );
}
