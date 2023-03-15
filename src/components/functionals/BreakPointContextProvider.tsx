import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

type BreakPointType = {
  showMode: "ph-in" | "ph-out";
};

/** 本当は tailwind の config から breakpoint を引っ張ってくることが望ましい */
const getShowMode = (width: number) => (width >= 640 ? "ph-out" : "ph-in");

const BreakPointContext = createContext<BreakPointType>({ showMode: "ph-in" });

export function BreakPointContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [breakPointData, setBreakPointData] = useState<BreakPointType>({
    showMode: getShowMode(window.innerWidth),
  });
  const resizeFunc = useCallback(
    () => setBreakPointData({ showMode: getShowMode(window.innerWidth) }),
    [],
  );
  useEffect(() => {
    window.addEventListener("resize", resizeFunc);
    return () => {
      window.removeEventListener("resize", resizeFunc);
    };
  }, []);
  const BreakPointMemo: BreakPointType = useMemo(
    () => breakPointData,
    [breakPointData],
  );

  return (
    <BreakPointContext.Provider value={BreakPointMemo}>
      {children}
    </BreakPointContext.Provider>
  );
}

/**
 * 画面サイズが pc か スマホかを解釈する hooks
 */
export const useBreakPointContext = () => useContext(BreakPointContext);
