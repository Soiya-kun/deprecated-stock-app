import { ReactNode, useState } from "react";

import { SixDotsScaleMiddle } from "@/components/ui/SixdotsScaleMiddle";

type Variant = "primary" | "secondary" | "delete";

export type Props = {
  block?: boolean;
  children: ReactNode;
  className?: string;
  disabled?: boolean;
  onClick?: () => void | Promise<void>;
  variant: Variant;
};

export function Button({
  block = false,
  children,
  className = "",
  disabled = false,
  onClick,
  variant,
}: Props): JSX.Element {
  // eslint-disable-next-line no-unused-vars
  const Variants: { [key in Variant]: string } = {
    primary: "text-white bg-primary",
    secondary: "text-gray-600 border-gray-300 border",
    delete: "text-white bg-red-500",
  };

  const [isLoading, setIsLoading] = useState(false);

  const onClickWrappedForLoading = async () => {
    setIsLoading(true);
    if (onClick !== null && onClick !== undefined) {
      await onClick();
    }
    setIsLoading(false);
  };

  return (
    <button
      className={`flex items-center justify-center rounded-md px-3 py-2 outline-none
      ${block ? "block w-full" : ""}
      ${Variants[variant]}
      ${className}
      ${
        disabled || isLoading
          ? "cursor-not-allowed opacity-50"
          : "hover:opacity-90 hover:shadow-md"
      }`}
      disabled={disabled || isLoading}
      onClick={onClickWrappedForLoading}
      type="button"
    >
      {isLoading ? <SixDotsScaleMiddle className="h-full" /> : children}
    </button>
  );
}
