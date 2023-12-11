import { format, parse } from "date-fns";
import defaultLocale from "date-fns/locale/en-AU/index.js";

export const parseDateTime = (dateString: string, timeString: string) =>
  parse(`${dateString} ${timeString}`, "yyyy-MM-dd HH:mm", new Date());

export const humanizeTime = (date: Date) => format(date, "h:mm a");

export const wait = (ms: number) => new Promise((res) => setTimeout(res, ms));

export const periodDisplayName = (period: any, useShortSubject = false) => {
  switch (period.type) {
    case "transition":
      return "Transition";
    case "rollcall":
      return "Roll Call";
    case "free":
      return "Free Period";
    case "dayend":
      return "End of Day";
    case "break":
      return period.break;
    case "class":
      return useShortSubject ? period.subjectShort : period.subject;
  }
};
const formatDistanceLocale: { [key: string]: string } = {
  lessThanXSeconds: "{{count}}s",
  xSeconds: "{{count}}s",
  halfAMinute: "30s",
  lessThanXMinutes: "{{count}}m",
  xMinutes: "{{count}}m",
  aboutXHours: "{{count}}h",
  xHours: "{{count}}h",
  xDays: "{{count}}d",
  aboutXWeeks: "{{count}}w",
  xWeeks: "{{count}}w",
  aboutXMonths: "{{count}}m",
  xMonths: "{{count}}m",
  aboutXYears: "{{count}}y",
  xYears: "{{count}}y",
  overXYears: "{{count}}y",
  almostXYears: "{{count}}y",
};

export const dateFnsLocale: Locale = {
  ...defaultLocale,
  formatDistance: (token, count, options) => {
    options = options || {};

    const result = formatDistanceLocale[token].replace("{{count}}", count);

    if (options.addSuffix) {
      if (options.comparison > 0) {
        return "in " + result;
      } else {
        return result + " ago";
      }
    }

    return result;
  },
};
