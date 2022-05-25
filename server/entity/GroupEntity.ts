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

@Entity({ name: "groups" })
export class GroupEntity {
  constructor(
    name: string,
    criteria: CriteriaEntity,
    isPrivate: boolean,
    // members: GroupMemberEntity[],
    rules = "",
    uuid = uuidv4()
  ) {
    this.uuid = uuid;
    this.name = name;
    this.criteria = criteria;
    this.isPrivate = isPrivate;
    // this.users = members!;
    this.rules = rules;
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

  @OneToOne(() => CriteriaEntity, { eager: true })
  @JoinColumn({ name: "criteria" })
  criteria: CriteriaEntity;

  @OneToMany(() => GroupMemberEntity, (gm) => gm.group, { lazy: true })
  users: Promise<GroupMemberEntity[]> | undefined;

  // @OneToMany(() => GroupRequestEntity, (gr) => gr.group)
  // requests: GroupRequestEntity[] | undefined;
}
