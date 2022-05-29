export enum SchoolWeight {
  FIVE = 41.4,
  FOUR = 36.2,
  THREE = 12.1,
  TWO = 3.4,
  ONE = 6.9,
  SUM = FIVE * 5 + FOUR * 4 + THREE * 3 + TWO * 2 + ONE,
}

export enum SubjectWeight {
  FIVE = 15.5,
  FOUR = 34.5,
  THREE = 27.6,
  TWO = 17.2,
  ONE = 5.2,
  SUM = FIVE * 5 + FOUR * 4 + THREE * 3 + TWO * 2 + ONE,
}

export enum LocationWeight {
  FIVE = 20.7,
  FOUR = 37.9,
  THREE = 22.4,
  TWO = 8.6,
  ONE = 10.3,
  SUM = FIVE * 5 + FOUR * 4 + THREE * 3 + TWO * 2 + ONE,
}

export enum GradeGoalWeight {
  FIVE = 55.2,
  FOUR = 12.1,
  THREE = 17.2,
  TWO = 6.9,
  ONE = 8.6,
  SUM = FIVE * 5 + FOUR * 4 + THREE * 3 + TWO * 2 + ONE,
}

export enum LanguageWeight {
  FIVE = 20.7,
  FOUR = 31.0,
  THREE = 13.8,
  TWO = 15.5,
  ONE = 17.2,
  SUM = FIVE * 5 + FOUR * 4 + THREE * 3 + TWO * 2 + ONE,
}

export enum WorkFrequencyWeight {
  FIVE = 32.8,
  FOUR = 43.1,
  THREE = 22.4,
  TWO = 1.7,
  ONE = 0.0,
  SUM = FIVE * 5 + FOUR * 4 + THREE * 3 + TWO * 2 + ONE,
}

export enum WorkTypeWeight {
  FIVE = 44.8,
  FOUR = 32.8,
  THREE = 19.0,
  TWO = 3.4,
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
