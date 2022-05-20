import {
  GradeGoalWeight,
  LanguageWeight,
  LocationWeight,
  MaxSizeWeight,
  SchoolWeight,
  SubjectWeight,
  WorkFrequencyWeight,
  WorkTypeWeight,
} from "./fromQuestionaire";

export enum SearchWeightValues {
  GRADE_GOAL = GradeGoalWeight.SUM,
  WORK_FREQUENCY = WorkFrequencyWeight.SUM,
  WORK_TYPE = WorkTypeWeight.SUM,
  MAX_SIZE = MaxSizeWeight,
  LANGUAGE = LanguageWeight.SUM,
  LOCATION = LocationWeight.SUM,
  SCHOOL = SchoolWeight.SUM,
  SUBJECTS = SubjectWeight.SUM,
  MAX = GRADE_GOAL +
    WORK_FREQUENCY +
    WORK_TYPE +
    MAX_SIZE +
    LANGUAGE +
    LOCATION +
    SCHOOL +
    SUBJECTS,
}
