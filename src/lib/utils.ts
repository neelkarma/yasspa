import { format, parse } from "date-fns";

export const parseDateTime = (dateString: string, timeString: string) =>
  parse(`${dateString} ${timeString}`, "yyyy-MM-dd HH:mm", new Date());

export const humanizeTime = (date: Date) => format(date, "h:mm a");

export const wait = (ms: number) => new Promise((res) => setTimeout(res, ms));
