export interface Date {
  date: string;
  term: string;
  week: string;
  weekType: string;
  dayNumber: string;
}

export type Terms = {
  [key: string]: {
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
