import { ChangeEvent } from "react";

type Props = {
  className?: string;
  handleInputOnChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

export function TestPresenter({ className, handleInputOnChange }: Props) {
  return <div className={`${className}`}>testPresenter</div>;
}
dw;
