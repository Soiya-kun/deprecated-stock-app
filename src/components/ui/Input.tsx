import { forwardRef, InputHTMLAttributes } from "react";

export type Props = Partial<InputHTMLAttributes<HTMLInputElement>>;

export const Input = forwardRef<HTMLInputElement, Props>(
  ({ className, ...rest }, ref) => (
    <input
      className={`w-full rounded-md border border-gray-300 p-3
         focus-within:border-gray-600 focus:outline-none ${className}`}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...rest}
      ref={ref}
    />
  ),
);
