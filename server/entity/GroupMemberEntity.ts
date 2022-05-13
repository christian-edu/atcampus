import { Column, Entity, ManyToOne, PrimaryColumn } from "typeorm";
import { UserEntity } from "./UserEntity";
import { GroupEntity } from "./GroupEntity";

@Entity()
export class GroupMemberEntity {
  constructor(user_uuid: string, group_uuid: string, is_admin: boolean) {
    this.user_uuid = user_uuid;
    this.group_uuid = group_uuid;
    this.is_admin = is_admin;
  }

  @PrimaryColumn()
  uuid!: string;

  @Column()
  is_admin: boolean;

  // Dokumentasjon påstår jeg må ha denne med
  @Column()
  user_uuid: string;

  // Dokumentasjon påstår jeg må ha denne med
  @Column()
  group_uuid: string;

  @ManyToOne(() => UserEntity, (user) => user.groups)
  user!: UserEntity;

  @ManyToOne(() => GroupEntity, (group) => group.users)
  group!: GroupEntity;
}
