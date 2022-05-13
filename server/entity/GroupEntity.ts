import { Column, Entity, OneToMany, OneToOne, PrimaryColumn } from "typeorm";
import { CriteriaEntity } from "./CriteriaEntity";
import { GroupMemberEntity } from "./GroupMemberEntity";
import { GroupRequestEntity } from "./GroupRequestEntity";

@Entity()
export class GroupEntity {
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
  criteria: CriteriaEntity;

  @OneToMany(() => GroupMemberEntity, (gm) => gm.group)
  users: GroupMemberEntity[];

  @OneToMany(() => GroupRequestEntity, (gr) => gr.group)
  requests: GroupRequestEntity[];
}
