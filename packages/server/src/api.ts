import type { Express } from "express";
import type { AuthorizationCode } from "simple-oauth2";
/*

VALID SBHS API ENDPOINTS
------------------------
 - "barcodenews/list.json" - Returns the news as displayed on the attendance computers ("Barcode Stations") for a student's year group.
 - "calendar/days.json" - Returns information about the school days in the given date range - what term, week, week type etc the days are
 - "calendar/terms.json" - Returns information about the school year - when each term starts and ends. Also returns information about public holidays and staff development days.
 - "dailynews/list.json" - Returns the daily notices for a given date. Results are not filtered for the user's user group. If you wish to do this, obtain the user's year group from details/userinfo.json and filter the results yourself.
 - "diarycalendar/events.json" - Returns calendar event information for the authorising student for a given date range. The information returned is sourced from: school calendar, Moodle course events ("coursework"), school assessments, school homework (not currently operating) and personal My Diary entries.
 - "timetable/bells.json" - Returns information about the bell times for a given date. Information includes information about the day in the timetable cycle, the progression of periods, the time of each bell and the reason for bell changes.
 - "timetable/daytimetable.json" - Returns the timetable for a student for a given date. This is what displays a student's timetable on the front page of the Student Portal.
 - "timetable/timetable.json" - Returns the complete timetable for a student.
 - "details/participation.json" - Returns a student's Award Scheme participation information
 - "details/userinfo.json" - Returns information about the user the supplied Access Token is valid for

*/

export default (app: Express, oauth2: AuthorizationCode) => {
  //TODO: Set up data endpoints here
};
