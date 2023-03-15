type Props = {
  label: string;
  className?: string;
};

// 小見出し
export function TitleSmall({ label, className }: Props) {
  return <div className={`text-xs font-bold ${className}`}>{label}</div>;
}
