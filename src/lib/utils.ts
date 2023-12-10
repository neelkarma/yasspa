import { format, parse } from "date-fns";

export const humanizeTime = (time: string) =>
  format(parse(time, "HH:mm", new Date()), "h:mm a");

export const wait = (ms: number) => new Promise((res) => setTimeout(res, ms));
