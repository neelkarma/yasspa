export interface Timetable {
  student: Student;
  subjects: SubjectClass[];
  days: { [key: string]: Day };
  rollcall: SubjectClass;
  advisor: string;
}

export interface Day {
  dayname: string;
  routine: string;
  rollcall: DayRollcall;
  periods: { [key: string]: Period };
  dayNumber: string;
}

export interface Period {
  title: string;
  teacher: null | string;
  room: null | string;
  fullTeacher: string;
  year: string;
}

export interface DayRollcall {
  title: string;
  teacher: string;
  room: null;
}

export interface SubjectClass {
  title: string;
  shortTitle: string;
  teacher: null | string;
  subject: string;
  fullTeacher: string;
  year: string;
  colour: string;
}

export interface Student {
  surname: string;
  givenname: string;
  gender: string;
  DOB: null;
  roll: string;
  BoSNumber: null;
  year: string;
  years: string[];
  studentId: string;
}
