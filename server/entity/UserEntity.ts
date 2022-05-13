import { Column, Entity, ManyToOne, OneToMany, PrimaryColumn } from "typeorm";
import { IsEmail } from "class-validator";
import { SchoolEntity } from "./SchoolEntity";
import { GroupMemberEntity } from "./GroupMemberEntity";
import { GroupRequestEntity } from "./GroupRequestEntity";

@Entity()
export class UserEntity {
  constructor() {}

  @PrimaryColumn()
  uuid: string;

  @Column({
    nullable: false,
    name: "username",
    unique: true,
  })
  userName: string;

  @Column({
    nullable: false,
  })
  @IsEmail()
  email: string;

  @Column({ name: "first_name" })
  firstName: string;

  @Column({ name: "last_name" })
  lastName: string;

  @ManyToOne(() => SchoolEntity, (school) => school.users)
  school_uuid: SchoolEntity;

  @OneToMany(() => GroupMemberEntity, (gm) => gm.user)
  groups: GroupMemberEntity[];

  @OneToMany(() => GroupRequestEntity, (gr) => gr.user)
  requests: GroupRequestEntity[];
}
