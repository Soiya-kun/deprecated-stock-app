import { ReactNode } from "react";

import { noError } from "@/domains/errorObject";
import { validateByKey, Validations } from "@/domains/validationObject";

export type ImportanceLabel = "必須" | "任意" | "";

export type Props<T> = {
  name: keyof T;
  obj: T;
  validations?: Validations<T>;
  label: string;
  helpText?: string;
  htmlFor?: string;
  importanceLabel?: ImportanceLabel;
  hasValidated?: boolean;
  className?: string;
  innerClassName?: string;
  children: ReactNode;
};

// 入力フォームの外枠（label、hint、errorMessage）
export function TitleAndErrorFrame<T>({
  label,
  obj,
  name,
  validations,
  helpText = "",
  htmlFor,
  importanceLabel,
  hasValidated = false,
  className,
  innerClassName,
  children,
}: Props<T>) {
  const validationResult =
    validations != null ? validateByKey(obj, name, validations) : noError();

  return (
    <div className={`mt-4 ${className}`}>
      <div className="mb-2 flex items-center">
        <label
          htmlFor={htmlFor}
          className={`mr-2 text-sm ${
            validationResult.hasError && hasValidated ? "text-red-500" : ""
          }`}
        >
          {label}
        </label>
        {importanceLabel !== "" && (
          <span
            className={`text-xs ${
              importanceLabel === "必須" ? "text-red-500" : "text-gray-400"
            }`}
          >
            {importanceLabel}
          </span>
        )}
      </div>
      <div className={`${innerClassName}`}>
        {children}
        {helpText !== "" && (
          <p className="mt-1 text-xs text-gray-400">{helpText}</p>
        )}
        {validationResult.hasError && hasValidated && (
          <p className="mt-1 text-xs text-red-500">
            {validationResult.message}
          </p>
        )}
      </div>
    </div>
  );
}
