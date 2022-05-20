export enum SchoolWeight {
  FIVE = 39.5,
  FOUR = 36.8,
  THREE = 18.4,
  TWO = 2.6,
  ONE = 2.6,
  SUM = FIVE * 5 + FOUR * 4 + THREE * 3 + TWO * 2 + ONE,
}

export enum SubjectWeight {
  FIVE = 15.8,
  FOUR = 31.6,
  THREE = 34.2,
  TWO = 15.8,
  ONE = 2.6,
  SUM = FIVE * 5 + FOUR * 4 + THREE * 3 + TWO * 2 + ONE,
}

export enum LocationWeight {
  FIVE = 18.4,
  FOUR = 34.2,
  THREE = 28.9,
  TWO = 10.5,
  ONE = 7.9,
  SUM = FIVE * 5 + FOUR * 4 + THREE * 3 + TWO * 2 + ONE,
}

export enum GradeGoalWeight {
  FIVE = 60.5,
  FOUR = 18.4,
  THREE = 10.5,
  TWO = 5.3,
  ONE = 5.3,
  SUM = FIVE * 5 + FOUR * 4 + THREE * 3 + TWO * 2 + ONE,
}

export enum LanguageWeight {
  FIVE = 15.8,
  FOUR = 34.2,
  THREE = 18.4,
  TWO = 10.5,
  ONE = 21.1,
  SUM = FIVE * 5 + FOUR * 4 + THREE * 3 + TWO * 2 + ONE,
}

export enum WorkFrequencyWeight {
  FIVE = 31.6,
  FOUR = 50.0,
  THREE = 15.8,
  TWO = 2.6,
  ONE = 0.0,
  SUM = FIVE * 5 + FOUR * 4 + THREE * 3 + TWO * 2 + ONE,
}

export enum WorkTypeWeight {
  FIVE = 44.7,
  FOUR = 34.2,
  THREE = 18.4,
  TWO = 2.6,
  ONE = 0.0,
  SUM = FIVE * 5 + FOUR * 4 + THREE * 3 + TWO * 2 + ONE,
}

export const MaxSizeWeight = Math.round(
  (SchoolWeight.SUM +
    SubjectWeight.SUM +
    LocationWeight.SUM +
    GradeGoalWeight.SUM +
    LanguageWeight.SUM +
    WorkFrequencyWeight.SUM +
    WorkTypeWeight.SUM * 70) /
    10
);
