import { Column, Entity, ManyToOne, PrimaryColumn } from "typeorm";
import { UserEntity } from "./UserEntity";
import { GroupEntity } from "./GroupEntity";
import { Recipient } from "./enums/Recipient";
import { v4 as uuidv4 } from "uuid";

@Entity()
export class GroupRequestEntity {
  constructor() {
    this.uuid = uuidv4();
  }

  @PrimaryColumn()
  uuid: string;

  @Column({ type: "enum", enum: Recipient })
  recipient: Recipient;

  @Column({ type: "text" })
  message: string;

  // Dokumentasjon påstår jeg må ha denne med
  @Column()
  user_uuid: string;

  // Dokumentasjon påstår jeg må ha denne med
  @Column()
  group_uuid: string;

  @ManyToOne(() => UserEntity, (user) => user.requests)
  user!: UserEntity;

  @ManyToOne(() => GroupEntity, (group) => group.requests)
  group!: GroupEntity;
}
