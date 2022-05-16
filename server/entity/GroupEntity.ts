import { Column, Entity, OneToMany, OneToOne, PrimaryColumn } from "typeorm";
import { CriteriaEntity } from "./CriteriaEntity";
import { GroupMemberEntity } from "./GroupMemberEntity";
import { GroupRequestEntity } from "./GroupRequestEntity";
import { v4 as uuidv4 } from "uuid";

@Entity()
export class GroupEntity {
  constructor(
    name: string,
    criteria: CriteriaEntity,
    isPrivate: boolean,
    //users: GroupMemberEntity[],
    rules = ""
  ) {
    this.uuid = uuidv4();
    this.name = name;
    this.criteria = criteria;
    this.isPrivate = isPrivate;
    this.users = new Array<GroupMemberEntity>();
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
  rules: string | undefined;

  @Column({
    default: false,
    name: "is_private",
  })
  isPrivate: boolean;

  @OneToOne(() => CriteriaEntity)
  criteria: CriteriaEntity;

  @OneToMany(() => GroupMemberEntity, (gm) => gm.group)
  users: GroupMemberEntity[];

  @OneToMany(() => GroupRequestEntity, (gr) => gr.group)
  requests: GroupRequestEntity[];
}
