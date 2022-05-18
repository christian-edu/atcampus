import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { UserEntity } from "./UserEntity";
import { GroupEntity } from "./GroupEntity";

@Entity()
export class GroupMemberEntity {
  constructor(user: UserEntity, group: GroupEntity, is_admin: boolean) {
    this.user = user;
    this.group = group;
    this.is_admin = is_admin;
  }

  @PrimaryColumn()
  uuid!: string;

  @Column()
  is_admin: boolean;

  @ManyToOne(() => UserEntity, (user) => user.groups)
  @JoinColumn({ name: "user_uuid" })
  user!: UserEntity;

  @ManyToOne(() => GroupEntity, (group) => group.users)
  @JoinColumn({ name: "group_uuid" })
  group!: GroupEntity;
}
