import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export type FindFirstByQueryHookType<T> = {
  ret: T;
  hasFailed: boolean;
  id: string | undefined;
  isLoading: boolean;
  setRet: (t: T) => void;
  find: (id: string) => Promise<void>;
};

// findById関連をまとめたhooks
// key: pathParam以外のIDを指定する場合に利用する
export const useFindFirstByQuery = <T>(
  findById: (id: string) => Promise<T>,
  newT: () => T,
  key?: string,
): FindFirstByQueryHookType<T> => {
  const { id } = useParams<{ id: string }>();
  const [ret, setRet] = useState<T>(newT());
  const [hasFailed, setHasFailed] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const query = () => {
    if (id !== undefined) {
      return id;
    }
    if (key !== undefined) {
      return key;
    }
    return "";
  };

  const find = async (attr: string) => {
    setIsLoading(true);
    if (id === undefined && key === undefined) {
      setHasFailed(true);
      setIsLoading(false);
      return;
    }
    try {
      const result = await findById(attr);
      setRet(result);
    } catch (e) {
      setHasFailed(true);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    find(query());
  }, []);

  return { ret, hasFailed, id, isLoading, setRet, find };
};
