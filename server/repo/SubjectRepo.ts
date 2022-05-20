import { AppDataSource } from "../server";
import { SubjectEntity } from "../entity/SubjectEntity";

export const SubjectRepo = AppDataSource.getRepository(SubjectEntity).extend({
  async findOrCreate(subject: SubjectEntity): Promise<SubjectEntity> {
    return await this.findOneByOrFail({ name: subject.name }).then(
      async (foundSubject) => {
        if (!foundSubject) {
          return await this.save(subject).then((savedSubject) => {
            return savedSubject;
          });
        }
        return foundSubject;
      }
    );
  },
});
