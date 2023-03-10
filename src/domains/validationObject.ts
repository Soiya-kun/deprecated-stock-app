import { ErrorObject, noError } from "@/domains/errorObject";

export type ValidationObject<T> = {
  key: keyof T;
  validate: (obj: T) => ErrorObject;
};

export type Validations<T> = ValidationObject<T>[];

export const validateByKey = <T>(
  obj: T,
  key: keyof T,
  validations: Validations<T>,
): ErrorObject => {
  const validation = validations.find((v) => v.key === key);
  if (validation === undefined) {
    return noError();
  }
  return validation.validate(obj);
};
