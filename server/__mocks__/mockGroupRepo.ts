import { GroupEntity } from "../entity/GroupEntity";
import { Repository } from "typeorm";

export default class MockGroupRepo extends Repository<GroupEntity> {}
