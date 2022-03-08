import { authCodes } from "../constants";
import moment from "moment";

export const codeFormatter = (code = "") => {
  if (typeof code !== "string") return "";
  if (code.slice(0, 1) === "0") return authCodes[code];
  return "";
};

export const momentToMilli = (moment) => moment.valueOf().toString();
export const momentToDate = (moment) => moment.format("DD/MM/YYYY");

export const milliToMoment = (milli) => {
  if (typeof milli === "number") milli.toString();
  return moment(milli, "x");
};
export const milliToDate = (milli) => {
  if (typeof milli === "number") milli.toString();
  return moment(milli, "x").format("DD/MM/YYYY");
};

export const phoneFormatter = (phone = "") => {};

export const formatNumberToPrice = (x) => {
  if (x === "" || x === 0) {
    return 0;
  }
  x = x.toString();
  x = x.replace(/ /g, "");
  var pattern = /(-?\d+)(\d{3})/;
  while (pattern.test(x)) x = x.replace(pattern, "$1.$2");
  return x;
};
