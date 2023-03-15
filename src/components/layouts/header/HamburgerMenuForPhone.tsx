import { useEffect, useState } from "react";
import { IoMdMenu } from "react-icons/io";
import { useLocation } from "react-router-dom";

import { HeaderMenuForPhone } from "@/components/layouts/header/HeaderMenuForPhone";

type Props = {
  className?: string;
};

export function HamburgerMenuForPhone({ className = "" }: Props) {
  const [isOpened, setIsOpened] = useState(false);
  const switchIsOpened = (newIsOpened: boolean) => {
    setIsOpened(newIsOpened);
  };

  const location = useLocation();
  useEffect(() => {
    setIsOpened(false);
  }, [location]);

  return (
    <div className={className}>
      <button
        type="button"
        onClick={() => {
          switchIsOpened(!isOpened);
        }}
      >
        <IoMdMenu className="h-8 w-8 cursor-pointer" />
      </button>
      {isOpened && (
        <HeaderMenuForPhone
          handleClickOnCloseButton={() => switchIsOpened(false)}
        />
      )}
    </div>
  );
}
