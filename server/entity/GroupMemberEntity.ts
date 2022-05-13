import { Column, Entity, ManyToOne, PrimaryColumn } from "typeorm";
import { UserEntity } from "./UserEntity";
import { GroupEntity } from "./GroupEntity";

@Entity()
export class GroupMemberEntity {
  @PrimaryColumn()
  uuid: string;

  @Column({ name: "is_admin" })
  isAdmin: boolean;

  // Dokumentasjon påstår jeg må ha denne med
  @Column({ name: "user_uuid" })
  userUuid: string;

  // Dokumentasjon påstår jeg må ha denne med
  @Column({ name: "group_uuid" })
  groupUuid: string;

  @ManyToOne(() => UserEntity, (user) => user.groups)
  user!: UserEntity;

  @ManyToOne(() => GroupEntity, (group) => group.users)
  group!: GroupEntity;
}
