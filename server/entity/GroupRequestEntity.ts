import { Column, Entity, ManyToOne, PrimaryColumn } from "typeorm";
import { UserEntity } from "./UserEntity";
import { GroupEntity } from "./GroupEntity";
import { Recipient } from "./enums/Recipient";

@Entity()
export class GroupRequestEntity {
  @PrimaryColumn()
  uuid: string;

  @Column({ type: "enum", enum: Recipient })
  recipient: Recipient;

  @Column({ type: "text" })
  message: string;

  // Dokumentasjon påstår jeg må ha denne med
  @Column({ name: "user_uuid" })
  userUuid: string;

  // Dokumentasjon påstår jeg må ha denne med
  @Column({ name: "group_uuid" })
  groupUuid: string;

  @ManyToOne(() => UserEntity, (user) => user.requests)
  user!: UserEntity;

  @ManyToOne(() => GroupEntity, (group) => group.requests)
  group!: GroupEntity;
}
