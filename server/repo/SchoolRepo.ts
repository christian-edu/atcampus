import { AppDataSource } from "../server";
import { SchoolEntity } from "../entity/SchoolEntity";

export const SchoolRepo = AppDataSource.getRepository(SchoolEntity).extend({
  // custom metoder settes her
});
