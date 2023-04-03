import { ChangeEvent } from "react";

export type Props = {
  id?: string;
  className?: string;
  name?: string;
  isDisabled?: boolean;
  maxLength?: number;
  onChange?: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  onBlur?: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  value?: string;
};

export function TextArea({
  id,
  className,
  name,
  isDisabled,
  maxLength,
  onChange,
  onBlur,
  value,
}: Props) {
  return (
    <textarea
      id={id}
      className={`focus-within:border-focus
        w-full overflow-y-auto rounded-md
        border border-gray-300 p-2 text-sm
    focus:outline-none ${className}`}
      name={name}
      onChange={onChange}
      onBlur={onBlur}
      value={value}
      disabled={isDisabled}
      maxLength={maxLength}
    />
  );
}
