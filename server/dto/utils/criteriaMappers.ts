import { CriteriaEntity } from "../../entity/CriteriaEntity";
import { CriteriaDto } from "../criteriaDto";
import { SubjectEntity } from "../../entity/SubjectEntity";
import { SchoolEntity } from "../../entity/SchoolEntity";

export function criteriaEntityToDto(entity: CriteriaEntity): CriteriaDto {
  const subjects: string[] = [];

  if (entity.subjects) {
    entity.subjects.forEach((subject) => {
      subjects.push(subject.name);
    });
  }

  return new CriteriaDto(
    entity.grade_goal,
    entity.work_frequency,
    entity.language,
    entity.max_size,
    entity.location,
    subjects,
    entity.work_type,
    entity.school.name
  );
}

export function criteriaDtoToEntity(dto: CriteriaDto): CriteriaEntity {
  const subjects = dto.subjects?.map((name) => {
    return new SubjectEntity(name);
  });

  return new CriteriaEntity(
    dto.gradeGoal!,
    dto.workFrequency,
    dto.workType,
    dto.maxSize,
    dto.language,
    dto.location,
    new SchoolEntity(dto.school),
    subjects
  );
}
