import { ChangeEvent, HTMLInputTypeAttribute } from "react";

/*
  inputのonChangeイベントハンドラ
  typeがundefinedの場合はtextとして扱う
 */
export const handleChangeOnInput = <T>(
  e: ChangeEvent<HTMLInputElement>,
  name: keyof T,
  setter: (obj: T) => void,
  obj: T,
  type?: HTMLInputTypeAttribute,
) => {
  if (type === "number") {
    setter({ ...obj, [name]: Number(e.target.value) });
    return;
  }
  if (type === "checkbox") {
    setter({ ...obj, [name]: e.target.checked });
    return;
  }
  if (type === "date") {
    setter({ ...obj, [name]: e.target.valueAsDate });
    return;
  }
  setter({ ...obj, [name]: e.target.value });
};

/*
  selectのonChangeイベントハンドラ
  typeがundefinedの場合はtextとして扱う
 */
export const handleChangeOnSelect = <T>(
  e: ChangeEvent<HTMLSelectElement>,
  name: keyof T,
  setter: (obj: T) => void,
  obj: T,
  type?: "number" | "boolean",
) => {
  if (type === "number") {
    setter({ ...obj, [name]: Number(e.target.value) });
    return;
  }
  if (type === "boolean") {
    // すでに入っている値がtrueでなく、変更後の値がtrueの場合にtrueにする
    if (e.target.value === "true" && obj[name] !== true) {
      setter({ ...obj, [name]: true });
      return;
    }
    // すでに入っている値がfalseでなく、変更後の値がfalseの場合にfalseにする
    if (e.target.value === "false" && obj[name] !== false) {
      setter({ ...obj, [name]: false });
      return;
    }
    setter({ ...obj, [name]: undefined });
    return;
  }
  setter({ ...obj, [name]: e.target.value });
};

/*
    selectManyのonSelectイベントハンドラ
    SelectBoxManyコンポーネントに対して用いる
 */
export const handleChangeOnSelectMany = <T>(
  value: string,
  name: keyof T,
  setter: (obj: T) => void,
  obj: T,
) => {
  const arr = obj[name];
  if (!(arr instanceof Array)) {
    throw new Error("value is not an array");
  }
  if (arr.includes(value)) {
    setter({
      ...obj,
      [name]: arr.filter((v) => v !== value),
    });
  } else {
    setter({
      ...obj,
      [name]: arr.concat(value),
    });
  }
};

/*
    selectManyのonRemoveイベントハンドラ
    SelectBoxManyコンポーネントに対して用いる
 */
export const handleRemoveOnSelectMany = <T, S>(
  value: S,
  name: keyof T,
  setter: (obj: T) => void,
  obj: T,
) => {
  const arr = obj[name];
  if (!(arr instanceof Array)) {
    throw new Error("value is not an array");
  }
  if (arr.includes(value)) {
    setter({
      ...obj,
      [name]: arr.filter((v) => v !== value),
    });
  }
};
