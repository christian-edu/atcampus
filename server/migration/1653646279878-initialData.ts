import { MigrationInterface, QueryRunner } from "typeorm";
import { v4 as uuidv4 } from "uuid";

export class initialData1653646279878 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `INSERT INTO schools(name, uuid)VALUES ('HK', '${uuidv4()}'),('BI', '${uuidv4()}'),('OsloMet', '${uuidv4()}'),('UiO', '${uuidv4()}'),('UiS', '${uuidv4()}'),('UiT', '${uuidv4()}'),('UiB', '${uuidv4()}'),('MIT', '${uuidv4()}');`
    );
    await queryRunner.query(`INSERT INTO criterias(uuid, grade_goal, work_frequency, work_type, max_size, language, location, school) VALUES('${uuidv4()}','B', 'Hver dag', 'Fysisk', 'Stor (8+)', 'Norsk', 'Oslo', (SELECT uuid FROM schools WHERE name='HK')),('${uuidv4()}','A', 'Annenhver uke', 'Begge', 'Stor (8+)', 'Norsk', 'Oslo', (SELECT uuid FROM schools WHERE name='HK')), 
('${uuidv4()}','C', 'Hver dag', 'Fysisk', 'Stor (8+)', 'Tysk', 'Oslo', (SELECT uuid FROM schools WHERE name='BI'))`);
    await queryRunner.query(
      `INSERT INTO users(username, email, password, uuid)VALUES ('jimbob', 'jim@bob.com,' '$2b$10$io2NKvQX3TN.ULzd.FxhW.F0rQE57HUbcvl0muVYJgTem3uZzJAZ6',(SELECT uuid FROM SCHOOL WHERE NAME = 'MIT'), '${uuidv4()}'),('joebob', 'joe@bob.com', '$2b$10$io2NKvQX3TN.ULzd.FxhW.F0rQE57HUbcvl0muVYJgTem3uZzJAZ6',(SELECT uuid FROM SCHOOL WHERE NAME = 'MIT'), '${uuidv4()}');`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
