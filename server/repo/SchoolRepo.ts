import { AppDataSource } from "../server";
import { SchoolEntity } from "../entity/SchoolEntity";

export const SchoolRepo = AppDataSource.getRepository(SchoolEntity).extend({
  // custom metoder settes her
  findOrCreate(school: SchoolEntity) {
    const foundSchool = this.findOneByOrFail({ name: school.name });

    if (!foundSchool) {
      return this.save(school);
    }
    return foundSchool;
  },
});
