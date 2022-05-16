import { AppDataSource } from "../server";
import { SubjectEntity } from "../entity/SubjectEntity";

export const SubjectRepo = AppDataSource.getRepository(SubjectEntity).extend({
  // custom metoder settes her
  findOrCreate(subject: SubjectEntity) {
    const foundSubject = this.findOneByOrFail({ name: subject.name });

    if (!foundSubject) {
      return this.save(subject);
    }
    return foundSubject;
  },
});
