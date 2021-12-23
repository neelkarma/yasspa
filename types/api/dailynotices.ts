export interface DailyNotices {
  date: string;
  dayInfo: Date;
  dateYesterday: string;
  dateTomorrow: string;
  notices: {
    title: string;
    content: string;
    years: string[];
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
