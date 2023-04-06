import { LogoBrown } from "@/components/ui/icon/LogoBrown";

type Props = {
  className?: string;
};

export function TopPageServicePresenter({ className }: Props) {
  return (
    <div className={`flex items-center ${className}`}>
      <div className="mx-auto w-max w-1/2">
        <h1 className="flex flex-col">
          <p className="mx-auto">Kabuuuで</p>
          <br />
          <p>トレードを極めよう</p>
        </h1>
      </div>
      <LogoBrown className="h-full w-1/2" />
    </div>
  );
}
