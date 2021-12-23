export interface Today {
  status: string;
  date: Date;
  bells: Bell[];
  timetable: TodayTimetable;
  roomVariations: any[];
  classVariations: any[];
  serverTimezone: string;
  shouldDisplayVariations: boolean;
}

export interface Bell {
  period: string;
  startTime: string;
  endTime: null | string;
  type: Type;
  time: string;
  bell: string;
  bellDisplay: string;
}

enum Type {
  O = "O",
  R = "R",
  T = "T",
}

interface TodayTimetable {
  timetable: TimetableTimetable;
  subjects: { [key: string]: Subject };
}

interface Subject {
  title: string;
  shortTitle: string;
  teacher: null | string;
  subject: string;
  fullTeacher: string;
  year: string;
  colour: string;
}

interface TimetableTimetable {
  dayname: string;
  routine: string;
  rollcall: Rollcall;
  periods: Periods;
  dayNumber: string;
}

interface Periods {
  "1": The1;
  "2": The1;
  "3": The1;
  "4": The1;
  "5": The1;
  RC: Rollcall;
}

interface The1 {
  title: string;
  teacher: string;
  room: string;
  fullTeacher: string;
  year: string;
}

interface Rollcall {
  title: string;
  teacher: string;
  room: null;
}
