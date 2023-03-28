import { Button, Props as ButtonProps } from "@/components/ui/Button";
import { ErrorMessage } from "@/components/ui/ErrorMessage";

type Props = ButtonProps & {
  buttonClassName?: string;
  errorMessage?: string;
  hasError?: boolean;
  hasValidated?: boolean;
};

export function ButtonWithError({
  variant,
  className,
  buttonClassName,
  disabled,
  children,
  onClick,
  hasError = false,
  hasValidated = true,
  errorMessage = "",
}: Props) {
  return (
    <div className={className}>
      <Button
        variant={variant}
        className={buttonClassName}
        onClick={onClick}
        disabled={disabled}
      >
        {children}
      </Button>
      <ErrorMessage
        message={errorMessage}
        hidden={!hasError || !hasValidated}
      />
    </div>
  );
}
