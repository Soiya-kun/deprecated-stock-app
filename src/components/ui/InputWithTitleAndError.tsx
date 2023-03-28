import { ChangeEvent, HTMLInputTypeAttribute, ReactNode } from "react";

import { Input } from "@/components/ui/Input";
import {
  ImportanceLabel,
  TitleAndErrorFrame,
} from "@/components/ui/TitleAndErrorFrame";
import { Validations } from "@/domains/validationObject";

export type InputHook<T> = {
  obj: T;
  handleChangeOnInput: (
    e: ChangeEvent<HTMLInputElement>,
    name: keyof T,
    type?: HTMLInputTypeAttribute,
  ) => void;
  validations: Validations<T>;
};

export type Props<T> = {
  className?: string;
  inputHook: InputHook<T>;
  disabled?: boolean;
  hasValidated?: boolean;
  helpText?: string;
  id?: string;
  importanceLabel?: ImportanceLabel;
  innerClassName?: string;
  inputClassName?: string;
  label: string;
  maxLength?: number;
  name: keyof T;
  onBlur?: (e: ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  type?: HTMLInputTypeAttribute;
  children?: ReactNode;
};

// Figma TextField
export function InputWithTitleAndError<T>({
  className,
  inputHook,
  disabled,
  hasValidated = false,
  helpText,
  id,
  importanceLabel,
  innerClassName,
  inputClassName,
  label,
  maxLength,
  name,
  onBlur,
  placeholder,
  type,
  children,
}: Props<T>) {
  return (
    <TitleAndErrorFrame
      className={className}
      innerClassName={innerClassName}
      hasValidated={hasValidated}
      helpText={helpText}
      htmlFor={id}
      importanceLabel={importanceLabel}
      label={label}
      name={name}
      obj={inputHook.obj}
      validations={inputHook.validations}
    >
      <Input
        className={inputClassName}
        disabled={disabled}
        id={id}
        maxLength={maxLength}
        name={String(name)}
        onBlur={onBlur}
        onChange={(e) => inputHook.handleChangeOnInput(e, name, type)}
        placeholder={placeholder}
        type={type}
      />
      {children}
    </TitleAndErrorFrame>
  );
}
