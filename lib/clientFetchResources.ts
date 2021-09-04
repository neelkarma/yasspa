import useSWR from "swr";

type APIEndpoint =
  | "/api/terms"
  | "/api/dailynotices"
  | "/api/calendar"
  | "/api/today"
  | "/api/timetable"
  | "/api/awardscheme"
  | "/api/userinfo";

type WeekType = "A" | "B" | "C";
type DayNumber = "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7";
type PeriodNumber = "1" | "2" | "3" | "4" | "5";
type TermNumber = "1" | "2" | "3" | "4";
type YearGroup = "7" | "8" | "9" | "10" | "11" | "12";

interface Response<T> {
  data: T;
  error?: string | undefined;
}

interface Date {
  date: string;
  term: string;
  week: string;
  weekType: WeekType;
  dayNumber: DayNumber;
}

type Terms = {
  [key in TermNumber]: {
    start: Date;
    end: Date;
  };
} & {
  publicHolidays: {
    [key: string]: string;
  };
  developmentDays: {
    [key: string]: string;
  };
};

interface DailyNotices {
  date: string;
  dayInfo: Date;
  dateYesterday: string;
  dateTomorrow: string;
  notices: {
    title: string;
    content: string;
    years: YearGroup[];
    dates: string[];
    relativeWeight: number;
    isMeeting: 0 | 1;
    meetingDate?: string;
    meetingTimeParsed?: string;
    meetingTime?: string;
    displayYears: string;
    authorName: string;
  }[];
}

interface SchoolEvent {
  type: "school";
  index: number;
  user: string;
  activity: string;
  venue: string;
  displayVenue: string;
  start: string;
  end: string;
  notes: string;
}

interface AssessmentEvent {
  type: "assessment";
  subtype:
    | "assignment"
    | "class test"
    | "exam"
    | "major work"
    | "project"
    | "assessment task"
    | "oral assessment";
  room: string;
  displayVenue: string;
  timeFrom: string;
  timeTo: string;
}

interface MoodleEvent {
  type: "moodle";
  subtype: string;
  modulename: string;
  eventtype: string;
  name: string;
  id: string;
  description: string;
  timestart: number;
  duration: number;
  courselink: string;
}

interface PersonalEvent {
  name: string;
  id: string;
  description: string;
  timestart: number;
}

type Calendar = {
  info: Date;
  items: (SchoolEvent | AssessmentEvent | MoodleEvent | PersonalEvent)[];
}[];

interface Today {
  status: string;
  date: string;
  bells: {
    bell: string;
    time: string;
    reasonShort: string;
    reason: string;
    bellDisplay: string;
  }[];
  timetable: {
    timetable: {
      dayname: string;
      routine: string;
      rollcall: {
        title: string;
        teacher: string;
        room: string;
      };
      periods: {
        [key in PeriodNumber]: {
          title: string;
          teacher: string;
          fullTeacher: string;
          room: string;
          year: YearGroup;
        };
      };
      subjects: {
        [key: string]: {
          title: string;
          shortTitle: string;
          teacher: string;
          subject: string;
          fullTeacher: string;
          year: YearGroup;
        };
      };
    };
  };
  roomVariations: {
    [key in PeriodNumber]: {
      period: PeriodNumber;
      year: number;
      title: string;
      roomFrom: string;
      roomTo: string;
    };
  };
  classVariations: {
    [key in PeriodNumber]: {
      period: PeriodNumber;
      year: number;
      title: string;
      teacher: string;
      type: "nocover" | "replacement" | "novariation";
      casual: string;
      casualSurname: string;
    };
  };
  serverTimezone: string;
  shouldDisplayVariations: boolean;
}

interface Timetable {
  student: {
    surname: string;
    givenname: string;
    sex: "M" | "B";
    DOB: string;
    roll: string;
    lines: {
      [key: string]: string;
    };
    extraLines: {
      [key: string]: string;
    };
    studentId: string;
    year: YearGroup;
    years: YearGroup[];
  };
  days: {
    [key: string]: {
      dayname: string;
      routine: string;
      rollcall: {
        title: string;
        teacher: string;
        room: string;
      };
      periods: {
        [key in PeriodNumber]: {
          title: string;
          teacher: string;
          room: string;
          year: YearGroup;
        };
      };
    };
  };
  subjects: {
    [key: string]: {
      title: string;
      shortTitle: string;
      subject: string;
      teacher: string;
      fullTeacher: string;
      year: YearGroup;
    };
  };
  extraSubjects: {
    [key: string]: {
      title: string;
      shortTitle: string;
      teacher: string;
      fullTeacher: string;
    };
  };
  rollcall: {
    title: string;
    teacher: string;
    fullTeacher: string;
    room: string;
  };
  advisor: string;
}

type AwardScheme = {
  year: string;
  activity: string;
  category: string;
  categoryName: string;
  points: string;
  pointsCap: number;
}[];

interface UserInfo {
  username: string;
  studentId: string;
  givenName: string;
  surname: string;
  rollClass: string;
  yearGroup: YearGroup;
  role: "Student" | "Teacher" | "Staff";
  department: string;
  office: string;
  email: string;
  emailAliases: string[];
  decEmail: string;
  groups: string[];
}

const apiFuncGenerator = <T>(
  path: APIEndpoint
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
