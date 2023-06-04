import { ChangeEvent, useState } from "react";

import { LoginReq, newLoginReq } from "@/domains/auth/dto";
import { validationsLoginReq } from "@/domains/auth/validation";
import { Validations } from "@/domains/validationObject";
import { useLogin } from "@/hooks/injections";

export type LoginHookType = {
  hasFailed: boolean;
  isLogining: boolean;
  obj: LoginReq;
  login: () => Promise<void>;
  handleChangeOnInput: (
    e: ChangeEvent<HTMLInputElement>,
    name: keyof LoginReq,
  ) => void;
  validations: Validations<LoginReq>;
};

export const useLoginHook = (): LoginHookType => {
  const [loginReq, setLoginReq] = useState(newLoginReq);

  const [isLogining, setIsLogining] = useState(false);
  const [hasFailed, setHasFailed] = useState(false);

  const l = useLogin();
  const login = async () => {
    setIsLogining(true);
    setHasFailed(false);
    try {
      await l(loginReq);
    } catch (e) {
      setHasFailed(true);
    }
    setIsLogining(false);
  };

  const handleChangeOnInput = (
    e: ChangeEvent<HTMLInputElement>,
    name: keyof LoginReq,
  ) => {
    setLoginReq({ ...loginReq, [name]: e.target.value });
  };

  return {
    hasFailed,
    isLogining,
    obj: loginReq,
    login,
    handleChangeOnInput,
    validations: validationsLoginReq,
  };
};
