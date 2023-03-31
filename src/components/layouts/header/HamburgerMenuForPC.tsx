import { useEffect, useRef, useState } from "react";
import { IoMdMenu } from "react-icons/io";

import { HeaderMenu } from "@/components/layouts/header/HeaderMenu";

type Props = {
  className?: string;
};

export function HamburgerMenuForPC({ className = "" }: Props) {
  const [isOpened, setIsOpened] = useState(false);
  const switchIsOpened = (newIsOpened: boolean) => {
    setIsOpened(newIsOpened);
  };

  const ref = useRef<HTMLDivElement>(null);
  const handleClickToCloseDropdown = (event: MouseEvent) => {
    if (event.target == null) {
      return;
    }
    const element = ref.current;
    if (!isOpened || (element?.contains(event.target as Node) ?? false)) return;
    switchIsOpened(false);
  };

  useEffect(() => {
    window.addEventListener("click", handleClickToCloseDropdown);
    return () => {
      window.removeEventListener("click", handleClickToCloseDropdown);
    };
  }, [isOpened, ref]);

  return (
    <div className={`relative ${className}`} ref={ref}>
      <button
        className="text-primary"
        type="button"
        onClick={() => switchIsOpened(!isOpened)}
      >
        <IoMdMenu className="h-8 w-8 cursor-pointer" />
      </button>
      {isOpened && <HeaderMenu className="absolute top-8 right-0 w-max" />}
    </div>
  );
}
