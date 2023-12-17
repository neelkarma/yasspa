export type TodayData = {
  day: string;
  date: string;
  periods: (
    | {
        type: "class";
        period: number;
        subject: string;
        subjectShort: string;
        teacher: string;
        room: string;
        isCancelled: boolean;
        isSubstitute: boolean;
        isRoomChange: boolean;
        time: string;
      }
    | {
        type: "free";
        period: number;
        time: string;
      }
    | {
        type: "break";
        break: string;
        time: string;
      }
    | {
        type: "rollcall";
        time: string;
      }
    | {
        type: "dayend";
        time: string;
      }
    | {
        type: "transition";
        time: string;
      }
  )[];
} | null;

export type TimetableData = {
  day: string;
  periods: (
    | {
        type: "free";
        period: number;
      }
    | {
        type: "class";
        period: number;
        subject: string;
        room: string;
      }
  )[];
}[][];

export type DailyNoticesData = {
  title: string;
  content: string;
  years: string[];
  displayYears: string;
  author: string;
}[];
