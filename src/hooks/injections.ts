import { useInMemorySampleAPI } from "@/adapters/api/sample/mock";
import { useInMemoryUserAPI } from "@/adapters/api/user/mock";
import { Token } from "@/domains/auth";
import { SampleCreate } from "@/usecases/dto/sample";
import { createSample, getSample, listSamples } from "@/usecases/sample";
import { findMe } from "@/usecases/user";

// Auth
// TODO usecase・adapterの実装
export const useGetTokenInCache = (): (() => Token) => () => ({
  tokenType: "Bearer",
  accessToken: "mockToken",
});

// User
export const useFindMe = () => {
  const deps = {
    api: useInMemoryUserAPI(),
  };
  return () => findMe(deps);
};

export const useListSamples = () => {
  const deps = {
    api: useInMemorySampleAPI(),
  };
  return () => listSamples(deps);
};

export const useGetSample = () => {
  const deps = {
    api: useInMemorySampleAPI(),
  };

  return (id: string) => getSample(id, deps);
};

export const useCreateSample = () => {
  const deps = {
    api: useInMemorySampleAPI(),
  };

  return (sc: SampleCreate) => createSample(sc, deps);
};
