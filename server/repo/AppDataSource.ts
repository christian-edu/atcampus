import { DataSource } from "typeorm";
import { GroupEntity } from "../entity/GroupEntity";
import { SubjectEntity } from "../entity/SubjectEntity";
import { ChatMessageEntity } from "../entity/ChatMessageEntity";
import { CriteriaEntity } from "../entity/CriteriaEntity";
import { GroupMemberEntity } from "../entity/GroupMemberEntity";
import { GroupRequestEntity } from "../entity/GroupRequestEntity";
import { SchoolEntity } from "../entity/SchoolEntity";
import { UserEntity } from "../entity/UserEntity";
import dotenv from "dotenv";

// npm run typeorm -- migration:run
// npm run typeorm -- migration:generate migration/navn-på-migration
//
dotenv.config();
export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST, // hentes fra process.env
  username: process.env.DB_USERNAME, // hentes fra process.env
  password: process.env.DB_PASSWORD, // hentes fra process.env
  database: process.env.DB_DATABASE, // hentes fra process.env,
  //connectTimeout: 1000000,
  //acquireTimeout: 1000000,
  synchronize: true,
  entities: [
    GroupEntity,
    SubjectEntity,
    ChatMessageEntity,
    CriteriaEntity,
    GroupMemberEntity,
    GroupRequestEntity,
    SchoolEntity,
    UserEntity,
  ],
  migrations: ["migration/*{.js,.ts}"],
  migrationsTableName: "atcampus_migration_table",
});
