import { useEffect, useState } from "react";

export type FindFirstWithNoQueryHookType<T> = {
  ret: T;
  hasFailed: boolean;
  isLoading: boolean;
  setRet: (t: T) => void;
  find: () => Promise<void>;
};

// findById関連をまとめたhooks
// key: pathParam以外のIDを指定する場合に利用する
export const useFindFirstWithNoQuery = <T>(
  findById: () => Promise<T>,
  newT: () => T,
): FindFirstWithNoQueryHookType<T> => {
  const [ret, setRet] = useState<T>(newT());
  const [hasFailed, setHasFailed] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const find = async () => {
    setIsLoading(true);
    try {
      const result = await findById();
      setRet(result);
    } catch (e) {
      setHasFailed(true);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    find();
  }, []);

  return { ret, hasFailed, isLoading, setRet, find };
};
