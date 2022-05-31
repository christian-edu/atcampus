export const groupCriterias = (criteria) => {
  return {
    Skolenavn: criteria.school,
    Sted: criteria.location,
    Språk: criteria.language,
    Emner: criteria.subjects.join(', '),
    Gruppestørrelse: criteria.maxSize,
    Karaktermål: criteria.gradeGoal,
    Arbeidsmetode: criteria.workType,
    Arbeidsfrekvens: criteria.workFrequency,
  };
};
