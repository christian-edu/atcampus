import { AppDataSource } from "../server";
import { SubjectEntity } from "../entity/SubjectEntity";

export const SubjectRepo = AppDataSource.getRepository(SubjectEntity).extend({
  // custom metoder settes her
});
