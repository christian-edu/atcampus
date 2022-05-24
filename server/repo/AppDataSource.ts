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

dotenv.config();
export const AppDataSource = new DataSource({
  type: "mariadb",
  host: process.env.DB_HOST, // hentes fra process.env
  username: process.env.DB_USERNAME, // hentes fra process.env
  password: process.env.DB_PASSWORD, // hentes fra process.env
  database: process.env.DB_DATABASE, // hentes fra process.env,
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
});
