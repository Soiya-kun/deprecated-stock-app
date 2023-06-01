import { LogoBrown } from "@/components/ui/icon/LogoBrown";

type Props = {
  className?: string;
};

export function TopPageServicePresenter({ className }: Props) {
  return (
    <div className={`${className}`}>
      <LogoBrown className="h-full" />
    </div>
  );
}
