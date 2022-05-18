import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryColumn,
} from "typeorm";
import { CriteriaEntity } from "./CriteriaEntity";
import { GroupMemberEntity } from "./GroupMemberEntity";
import { GroupRequestEntity } from "./GroupRequestEntity";
import { v4 as uuidv4 } from "uuid";
import { UserEntity } from "./UserEntity";

@Entity()
export class GroupEntity {
  constructor(
    name: string,
    criteria: CriteriaEntity,
    isPrivate: boolean,
    admin: UserEntity,
    rules = ""
  ) {
    this.uuid = uuidv4();
    this.name = name;
    this.criteria = criteria;
    this.isPrivate = isPrivate;
    this.users = new Array<GroupMemberEntity>();
    this.users.push(new GroupMemberEntity(admin, this, true));
    this.rules = rules;
    this.requests = new Array<GroupRequestEntity>();
  }
  @PrimaryColumn()
  uuid: string;

  @Column({
    unique: true,
  })
  name: string;

  @Column({
    type: "text",
  })
  rules: string;

  @Column({
    default: false,
    name: "is_private",
  })
  isPrivate: boolean;

  @OneToOne(() => CriteriaEntity)
  @JoinColumn({ name: "criteria_uuid" })
  criteria: CriteriaEntity;

  @OneToMany(() => GroupMemberEntity, (gm) => gm.group)
  users: GroupMemberEntity[];

  @OneToMany(() => GroupRequestEntity, (gr) => gr.group)
  requests: GroupRequestEntity[];
}
