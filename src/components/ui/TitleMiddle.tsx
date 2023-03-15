type Props = {
  id?: string;
  label: string;
  className?: string;
};

// 中見出し
export function TitleMiddle({ id, label, className }: Props) {
  return (
    <h2 className={`text-lg ${className}`} id={id}>
      {label}
    </h2>
  );
}
