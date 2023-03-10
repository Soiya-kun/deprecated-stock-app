import { LoginReq } from "@/domains/auth/dto";
import { error, ErrorObject, noError } from "@/domains/errorObject";
import { Validations } from "@/domains/validationObject";

const validateEmail = (loginReq: LoginReq): ErrorObject => {
  if (loginReq.email === "") {
    return error("emailは必須です");
  }
  if (!loginReq.email.includes("@")) {
    return error("emailの形式が不正です");
  }
  return noError();
};

const validatePassword = (loginReq: LoginReq): ErrorObject => {
  if (loginReq.password === "") {
    return error("passwordは必須です");
  }
  if (loginReq.password.length < 6) {
    return error("passwordは6文字以上です");
  }
  return noError();
};

export const validationsLoginReq: Validations<LoginReq> = [
  {
    key: "email",
    validate: validateEmail,
  },
  {
    key: "password",
    validate: validatePassword,
  },
];
