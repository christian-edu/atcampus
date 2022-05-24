import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
} from "typeorm";
import { IsEmail } from "class-validator";
import { SchoolEntity } from "./SchoolEntity";
import { GroupMemberEntity } from "./GroupMemberEntity";
import { GroupRequestEntity } from "./GroupRequestEntity";
import { v4 as uuidv4 } from "uuid";

@Entity()
export class UserEntity {
  constructor(
    userName: string,
    email: string,
    password: string,
    school = new SchoolEntity(),
    firstName = "",
    lastName = "",
    uuid = uuidv4()
  ) {
    this.uuid = uuid;
    this.userName = userName;
    this.email = email;
    this.password = password;
    this.firstName = firstName;
    this.lastName = lastName;
    this.school = school;
  }

  @PrimaryColumn()
  public uuid: string;

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

  @Column()
  password: string;

  @Column({ name: "first_name" })
  firstName: string;

  @Column({ name: "last_name" })
  lastName: string;

  @ManyToOne(() => SchoolEntity, (school) => school.users, { eager: true })
  @JoinColumn({ name: "school_uuid" })
  school: SchoolEntity;

  @OneToMany(() => GroupMemberEntity, (gm) => gm.user, { lazy: true })
  groups: Promise<GroupMemberEntity[]> | undefined;

  // @OneToMany(() => GroupRequestEntity, (gr) => gr.user)
  // requests: GroupRequestEntity[] | undefined;
}
