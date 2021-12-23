export interface Timetable {
  student: {
    surname: string;
    givenname: string;
    sex: string;
    DOB: string;
    roll: string;
    lines: {
      [key: string]: string;
    };
    extraLines: {
      [key: string]: string;
    };
    studentId: string;
    year: string;
    years: string[];
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
        [key: string]: {
          title: string;
          teacher: string;
          room: string;
          year: string;
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
      year: string;
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
