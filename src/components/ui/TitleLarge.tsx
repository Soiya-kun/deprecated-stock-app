import { ReactNode } from "react";

type Props = {
  label: string | ReactNode;
  className?: string;
};

export function TitleLarge({ label, className }: Props) {
  return (
    <h1
      className={`font-bold text-primary ph-in:text-xl ph-out:text-2xl ${className}`}
    >
      {label}
    </h1>
  );
}
