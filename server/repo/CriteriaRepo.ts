import { AppDataSource } from "../server";
import { CriteriaEntity } from "../entity/CriteriaEntity";

export const CriteriaRepo = AppDataSource.getRepository(CriteriaEntity).extend({
  // custom metoder settes her
});
