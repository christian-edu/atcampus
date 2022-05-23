// import { AppDataSource } from "../server";
import { SubjectEntity } from "../entity/SubjectEntity";
import { Repository } from "typeorm";

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

// export class SubjectRepository extends Repository<SubjectEntity> {
//     async findOrCreate(subject: SubjectEntity): Promise<SubjectEntity> {
//         return await this.findOneByOrFail({name: subject.name}).then(
//             async (foundSubject) => {
//                 if (!foundSubject) {
//                     return await this.save(subject).then((savedSubject) => {
//                         return savedSubject;
//                     });
//                 }
//                 return foundSubject;
//             }
//         );
//     }
// }
