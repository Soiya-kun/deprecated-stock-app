import { useState } from "react";

export type UsecaseHookType<ArgType> = {
  hasFailed: boolean;
  isExecuting: boolean;
  error?: unknown;
  exec: (arg: ArgType) => Promise<void>;
};

/**
 * Usecaseを引数ありで実行するためのフック
 * @param usecase
 */
export const useUsecase = <ArgType>(
  usecase: (arg: ArgType) => Promise<void>,
): UsecaseHookType<ArgType> => {
  const [hasFailed, setHasFailed] = useState(false);

  const [isExecuting, setIsExecuting] = useState(false);

  const [error, setError] = useState<unknown>();

  const exec = async (arg: ArgType) => {
    setIsExecuting(true);
    setHasFailed(false);
    try {
      await usecase(arg);
    } catch (e) {
      setHasFailed(true);
      setError(e);
    }
    setIsExecuting(false);
  };

  return {
    hasFailed,
    isExecuting,
    exec,
    error,
  };
};
