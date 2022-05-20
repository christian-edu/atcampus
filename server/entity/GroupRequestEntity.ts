import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { UserEntity } from "./UserEntity";
import { GroupEntity } from "./GroupEntity";
import { Recipient } from "./enums/Recipient";
import { v4 as uuidv4 } from "uuid";

@Entity()
export class GroupRequestEntity {
  constructor(
    recipient: Recipient,
    user: UserEntity,
    group: GroupEntity,
    message = ""
  ) {
    this.uuid = uuidv4();
    this.recipient = recipient;
    this.message = message;
    this.user = user;
    this.group = group;
  }

  @PrimaryColumn()
  uuid: string;

  @Column({ type: "enum", enum: Recipient })
  recipient: Recipient;

  @Column({ type: "text" })
  message: string;

  @ManyToOne(() => UserEntity, (user) => user.requests)
  @JoinColumn({ name: "user_uuid" })
  user!: UserEntity;

  @ManyToOne(() => GroupEntity, (group) => group.requests)
  @JoinColumn({ name: "group_uuid" })
  group!: GroupEntity;
}
