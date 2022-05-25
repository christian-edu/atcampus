import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { UserEntity } from "./UserEntity";
import { GroupEntity } from "./GroupEntity";
import { v4 as uuidv4 } from "uuid";

@Entity({ name: "group_members" })
export class GroupMemberEntity {
  // constructor(
  //   user: UserEntity,
  //   group: GroupEntity,
  //   is_admin: boolean,
  //   uuid = uuidv4()
  // ) {
  //   this.user = user;
  //   this.group = group;
  //   this.is_admin = is_admin;
  //   this.uuid = uuid;
  // }

  @PrimaryColumn()
  uuid: string = uuidv4();

  @Column()
  is_admin: boolean = false;

  @ManyToOne(() => UserEntity, (user) => user.groups, { eager: true })
  @JoinColumn({ name: "user" })
  user!: UserEntity;

  @ManyToOne(() => GroupEntity, (group) => group.users, { eager: true })
  @JoinColumn({ name: "group" })
  group!: GroupEntity;
}
