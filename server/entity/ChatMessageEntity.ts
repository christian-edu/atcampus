import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
} from "typeorm";
import { UserEntity } from "./UserEntity";
import { GroupEntity } from "./GroupEntity";
import { v4 as uuidv4 } from "uuid";

@Entity({ name: "chat_messages" })
export class ChatMessageEntity {
  constructor(
    message: string,
    user: UserEntity,
    group: GroupEntity,
    uuid = uuidv4()
  ) {
    this.message = message;
    this.user = user;
    this.group = group;
    this.uuid = uuid;
  }

  @PrimaryColumn()
  uuid: string;

  @Column()
  message: string;

  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: "user" })
  user!: UserEntity;

  @ManyToOne(() => GroupEntity)
  @JoinColumn({ name: "group" })
  group!: GroupEntity;

  @CreateDateColumn({
    type: "timestamp with time zone",
    default: () => "NOW()",
  })
  timestamp: Date | undefined;
}
