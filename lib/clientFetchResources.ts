import useSWR from "swr";
import { Today } from "types/api/today";
import { Terms } from "types/api/terms";
import { Calendar } from "types/api/calendar";
import { Timetable } from "types/api/timetable";
import { DailyNotices } from "types/api/dailynotices";
import { UserInfo } from "types/api/userinfo";
import { AwardScheme } from "types/api/awardscheme";

export interface Response<T> {
  data: T;
  error?: string | undefined;
}

const apiFuncGenerator = <T>(
  path: string
): (() => { res: Response<T>; error: any }) => {
  return () => {
    const { data: res, error } = useSWR(path);
    return { res, error };
  };
};

export const useTerms = apiFuncGenerator<Terms>("/api/terms");
export const useDailyNotices =
  apiFuncGenerator<DailyNotices>("/api/dailynotices");
export const useCalendar = apiFuncGenerator<Calendar>("/api/calendar");
export const useToday = apiFuncGenerator<Today>("/api/today");
export const useTimetable = apiFuncGenerator<Timetable>("/api/timetable");
export const useAwardScheme = apiFuncGenerator<AwardScheme>("/api/awardscheme");
export const useUserInfo = apiFuncGenerator<UserInfo>("/api/userinfo");
