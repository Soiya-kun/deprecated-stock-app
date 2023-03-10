import { ChangeEvent, HTMLInputTypeAttribute } from "react";

import { Input } from "@/components/ui/Input";
import {
  ImportanceLabel,
  TitleAndErrorFrame,
} from "@/components/ui/TitleAndErrorFrame";
import { Validations } from "@/domains/validationObject";

export type Props<T> = {
  className?: string;
  obj: T;
  disabled?: boolean;
  hasValidated?: boolean;
  helpText?: string;
  id?: string;
  importanceLabel?: ImportanceLabel;
  inputClassName?: string;
  label: string;
  maxLength?: number;
  name: keyof T;
  onBlur?: (e: ChangeEvent<HTMLInputElement>) => void;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  type?: HTMLInputTypeAttribute;
  value?: string;
  validations: Validations<T>;
};

// Figma TextField
export function InputWithTitle<T>({
  className,
  disabled,
  hasValidated = false,
  helpText,
  id,
  obj,
  importanceLabel,
  inputClassName,
  label,
  maxLength,
  name,
  onBlur,
  onChange,
  placeholder,
  type,
  value,
  validations,
}: Props<T>) {
  return (
    <TitleAndErrorFrame
      className={className}
      hasValidated={hasValidated}
      helpText={helpText}
      htmlFor={id}
      importanceLabel={importanceLabel}
      label={label}
      name={name}
      obj={obj}
      validations={validations}
    >
      <Input
        className={inputClassName}
        disabled={disabled}
        id={id}
        maxLength={maxLength}
        name={String(name)}
        onBlur={onBlur}
        onChange={onChange}
        placeholder={placeholder}
        type={type}
        value={value}
      />
    </TitleAndErrorFrame>
  );
}
