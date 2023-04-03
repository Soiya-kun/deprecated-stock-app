import { ChangeEvent } from "react";

import { TextArea } from "@/components/ui/TextArea";
import {
  ImportanceLabel,
  TitleAndErrorFrame,
} from "@/components/ui/TitleAndErrorFrame";
import { Validations } from "@/domains/validationObject";

export type TextAreaHook<T> = {
  obj: T;
  handleChangeOnInput: (
    e: ChangeEvent<HTMLTextAreaElement>,
    name: keyof T,
  ) => void;
  validations?: Validations<T>;
};

export type Props<T> = {
  className?: string;
  textAreaHook: TextAreaHook<T>;
  disabled?: boolean;
  hasValidated?: boolean;
  helpText?: string;
  id?: string;
  importanceLabel?: ImportanceLabel;
  innerClassName?: string;
  textAreaClassName?: string;
  label: string;
  maxLength?: number;
  name: keyof T;
  onBlur?: (e: ChangeEvent<HTMLTextAreaElement>) => void;
};

export function TextAreaWithTitleAndError<T>({
  className,
  textAreaHook,
  disabled,
  hasValidated = false,
  helpText,
  id,
  importanceLabel,
  innerClassName,
  textAreaClassName,
  label,
  maxLength,
  name,
  onBlur,
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
      obj={textAreaHook.obj}
      validations={textAreaHook.validations}
    >
      <TextArea
        id={id}
        className={textAreaClassName}
        isDisabled={disabled}
        maxLength={maxLength}
        name={String(name)}
        onBlur={onBlur}
        onChange={(e) => textAreaHook.handleChangeOnInput(e, name)}
      />
    </TitleAndErrorFrame>
  );
}
