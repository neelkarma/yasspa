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
  type: string;
  time: string;
  bell: string;
  bellDisplay: string;
}

export interface TodayTimetable {
  timetable: TimetableTimetable;
  subjects: { [key: string]: Subject };
}

export interface Subject {
  title: string;
  shortTitle: string;
  teacher: null | string;
  subject: string;
  fullTeacher: string;
  year: string;
  colour: string;
}

export interface TimetableTimetable {
  dayname: string;
  routine: string;
  rollcall: Rollcall;
  periods: Periods;
  dayNumber: string;
}

export interface Periods {
  "1": Period;
  "2": Period;
  "3": Period;
  "4": Period;
  "5": Period;
  RC: Rollcall;
}

export interface Period {
  title: string;
  teacher: string;
  room: string;
  fullTeacher: string;
  year: string;
}

export interface Rollcall {
  title: string;
  teacher: string;
  room: null;
}
