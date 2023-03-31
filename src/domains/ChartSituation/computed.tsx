import {
  getDayMa20,
  getDayMa5,
  getDayMa60,
  getWeekMa13,
  getWeekMa26,
  GraphValue,
} from "@/domains/stock/computed";

export type Result = {
  message: string;
  direction: boolean | undefined; // true: up, false: down, undefined: same
};

export const ma5Direction = (svDay: GraphValue[]): Result => {
  try {
    if (getDayMa5(svDay.slice(-1)[0]) === getDayMa5(svDay.slice(-2)[0]))
      return { message: "ma5 →", direction: undefined };
    return getDayMa5(svDay.slice(-1)[0]) > getDayMa5(svDay.slice(-2)[0])
      ? {
          message: "ma5 ↗",
          direction: true,
        }
      : {
          message: "ma5 ↘",
          direction: false,
        };
  } catch (e) {
    return { message: "", direction: undefined };
  }
};

export const ma20Direction = (svDay: GraphValue[]): Result => {
  try {
    if (getDayMa20(svDay.slice(-1)[0]) === getDayMa5(svDay.slice(-2)[0]))
      return { message: "ma20 →", direction: undefined };
    return getDayMa20(svDay.slice(-1)[0]) > getDayMa5(svDay.slice(-2)[0])
      ? {
          message: "ma20 ↗",
          direction: true,
        }
      : {
          message: "ma20 ↘",
          direction: false,
        };
  } catch (e) {
    return { message: "", direction: undefined };
  }
};
export const ma60Direction = (svDay: GraphValue[]): Result => {
  try {
    if (getDayMa60(svDay.slice(-1)[0]) === getDayMa5(svDay.slice(-2)[0]))
      return { message: "ma60 →", direction: undefined };
    return getDayMa60(svDay.slice(-1)[0]) > getDayMa5(svDay.slice(-2)[0])
      ? {
          message: "ma60 ↗",
          direction: true,
        }
      : {
          message: "ma60 ↘",
          direction: false,
        };
  } catch (e) {
    return { message: "", direction: undefined };
  }
};

export const wma13Direction = (svWeek: GraphValue[]): Result => {
  try {
    if (getWeekMa13(svWeek.slice(-1)[0]) === getWeekMa13(svWeek.slice(-2)[0]))
      return { message: "wma13 →", direction: undefined };
    return getWeekMa13(svWeek.slice(-1)[0]) > getWeekMa13(svWeek.slice(-2)[0])
      ? {
          message: "wma13 ↗",
          direction: true,
        }
      : {
          message: "wma13 ↘",
          direction: false,
        };
  } catch (e) {
    return { message: "", direction: undefined };
  }
};

export const wma26Direction = (svWeek: GraphValue[]): Result => {
  try {
    if (getWeekMa26(svWeek.slice(-1)[0]) === getWeekMa26(svWeek.slice(-2)[0]))
      return { message: "wma26 →", direction: undefined };
    return getWeekMa26(svWeek.slice(-1)[0]) > getWeekMa26(svWeek.slice(-2)[0])
      ? {
          message: "wma26 ↗",
          direction: true,
        }
      : {
          message: "wma26 ↘",
          direction: false,
        };
  } catch (e) {
    return { message: "", direction: undefined };
  }
};
export const ma5CrossMa20 = (svDay: GraphValue[]): Result => {
  try {
    if (
      getDayMa5(svDay.slice(-2)[0]) < getDayMa20(svDay.slice(-2)[0]) &&
      getDayMa5(svDay.slice(-1)[0]) >= getDayMa20(svDay.slice(-1)[0])
    )
      return { message: "ma5↗ma20", direction: true };
    if (
      getDayMa5(svDay.slice(-2)[0]) > getDayMa20(svDay.slice(-2)[0]) &&
      getDayMa5(svDay.slice(-1)[0]) <= getDayMa20(svDay.slice(-1)[0])
    )
      return { message: "ma5↘ma20", direction: false };
  } catch (e) {
    return { message: "", direction: undefined };
  }
  return { message: "", direction: undefined };
};

export const ma5CrossMa60 = (svDay: GraphValue[]): Result => {
  try {
    if (
      getDayMa5(svDay.slice(-2)[0]) < getDayMa60(svDay.slice(-2)[0]) &&
      getDayMa5(svDay.slice(-1)[0]) >= getDayMa60(svDay.slice(-1)[0])
    )
      return { message: "ma5↗ma60", direction: true };
    if (
      getDayMa5(svDay.slice(-2)[0]) > getDayMa60(svDay.slice(-2)[0]) &&
      getDayMa5(svDay.slice(-1)[0]) <= getDayMa60(svDay.slice(-1)[0])
    )
      return { message: "ma5↘ma60", direction: false };
  } catch (e) {
    return { message: "", direction: undefined };
  }
  return { message: "", direction: undefined };
};

export const ma20CrossMa60 = (svDay: GraphValue[]): Result => {
  try {
    if (
      getDayMa20(svDay.slice(-2)[0]) < getDayMa60(svDay.slice(-2)[0]) &&
      getDayMa20(svDay.slice(-1)[0]) >= getDayMa60(svDay.slice(-1)[0])
    )
      return { message: "ma20↗ma60", direction: true };
    if (
      getDayMa20(svDay.slice(-2)[0]) > getDayMa60(svDay.slice(-2)[0]) &&
      getDayMa20(svDay.slice(-1)[0]) <= getDayMa60(svDay.slice(-1)[0])
    )
      return { message: "ma20↘ma60", direction: false };
  } catch (e) {
    return { message: "", direction: undefined };
  }
  return { message: "", direction: undefined };
};
export const wma13CrossWma26 = (svDay: GraphValue[]): Result => {
  try {
    if (
      getWeekMa13(svDay.slice(-2)[0]) < getWeekMa26(svDay.slice(-2)[0]) &&
      getWeekMa13(svDay.slice(-1)[0]) >= getWeekMa26(svDay.slice(-1)[0])
    )
      return { message: "ma5↗ma20", direction: true };
    if (
      getWeekMa13(svDay.slice(-2)[0]) > getWeekMa26(svDay.slice(-2)[0]) &&
      getWeekMa13(svDay.slice(-1)[0]) <= getWeekMa26(svDay.slice(-1)[0])
    )
      return { message: "ma5↘ma20", direction: false };
  } catch (e) {
    return { message: "", direction: undefined };
  }
  return { message: "", direction: undefined };
};
