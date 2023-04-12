import { useEffect, useState } from "react";

export type ListHookType<T> = {
  hasFailed: boolean;
  isListing: boolean;
  ret: T[];
  error?: unknown;
};

/**
 * listUsecaseを実行するためのフック
 * @param listFunc
 */
export const useList = <T>(listFunc: () => Promise<T[]>): ListHookType<T> => {
  const [hasFailed, setHasFailed] = useState(false);

  const [isExecuting, setIsExecuting] = useState(false);

  const [error, setError] = useState<unknown>();

  const [ret, setRet] = useState<T[]>([]);

  const list = async () => {
    setIsExecuting(true);
    setHasFailed(false);
    try {
      const res = await listFunc();
      setRet(res);
    } catch (e) {
      setHasFailed(true);
      setError(e);
    }
    setIsExecuting(false);
  };

  useEffect(() => {
    list();
  }, []);

  return {
    hasFailed,
    isListing: isExecuting,
    ret,
    error,
  };
};
