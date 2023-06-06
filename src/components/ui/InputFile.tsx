import { ChangeEvent, forwardRef } from "react";

export type Props = {
  name?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: ChangeEvent<HTMLInputElement>) => void;
  accept?: string;
  multiple?: boolean;
};

export const InputFile = forwardRef<HTMLInputElement, Props>(
  ({ name, onChange = () => {}, onBlur, accept, multiple = false }, ref) => (
    <input
      className="hidden"
      name={name}
      ref={ref}
      onChange={(e) => {
        // fileのリセットをカプセル化
        onChange(e);
        e.target.value = "";
      }}
      onBlur={onBlur}
      type="file"
      accept={accept}
      multiple={multiple}
    />
  ),
);
