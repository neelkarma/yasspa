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

export type Calendar = {
  info: Date;
  items: (SchoolEvent | AssessmentEvent | MoodleEvent | PersonalEvent)[];
}[];
