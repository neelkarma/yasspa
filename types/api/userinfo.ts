export interface UserInfo {
  username: string;
  studentId: string;
  givenName: string;
  surname: string;
  rollClass: string;
  yearGroup: string;
  role: "Student" | "Teacher" | "Staff";
  department: string;
  office: string;
  email: string;
  emailAliases: string[];
  decEmail: string;
  groups: string[];
}
