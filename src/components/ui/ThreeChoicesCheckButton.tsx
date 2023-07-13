import { useState } from "react";

type Props = {
  className?: string;
  value: boolean | undefined;
  handleClick: (bool: boolean | undefined) => void;
};

export function ThreeChoicesCheckButton({
  className,
  value,
  handleClick,
}: Props) {
  const [isButtonVisible, setIsButtonVisible] = useState(false);

  // マウスが要素上にあるかどうかをトラックします
  const handleMouseOver = () => setIsButtonVisible(true);
  const handleMouseOut = () => setIsButtonVisible(false);

  return (
    // eslint-disable-next-line jsx-a11y/mouse-events-have-key-events
    <div
      className={`${className} relative flex rounded-md border ${
        value === true ? "bg-red-400" : ""
      } ${value === false ? "bg-blue-400" : ""}`}
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
    >
      {value === true && <span className="mx-auto">Yes</span>}
      {value === false && <span className="mx-auto">No</span>}
      {value === undefined && <span className="mx-auto">?</span>}
      {isButtonVisible && (
        <div className="absolute flex w-full rounded-md bg-white">
          <button
            type="button"
            onClick={() => handleClick(value === true ? undefined : true)}
            className={`w-1/2 rounded-l-md 
            ${value === true ? "hover:bg-red-400" : "hover:bg-red-200"}
            `}
          >
            Y
          </button>
          <button
            type="button"
            onClick={() => handleClick(value === false ? undefined : false)}
            className={`w-1/2 rounded-r-md
            ${value === false ? "hover:bg-blue-400" : "hover:bg-blue-200"}
            `}
          >
            N
          </button>
        </div>
      )}
    </div>
  );
}
