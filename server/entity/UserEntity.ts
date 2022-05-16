import { Column, Entity, ManyToOne, OneToMany, PrimaryColumn } from "typeorm";
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
    school: SchoolEntity,
    firstName = "",
    lastName = ""
  ) {
    this.uuid = uuidv4();
    this.userName = userName;
    this.email = email;
    this.password = password;
    this.firstName = firstName;
    this.lastName = lastName;
    this.school = school;
    this.groups = new Array<GroupMemberEntity>();
    this.requests = new Array<GroupRequestEntity>();
  }

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

  @Column()
  password: string;

  @Column({ name: "first_name" })
  firstName: string;

  @Column({ name: "last_name" })
  lastName: string;

  @ManyToOne(() => SchoolEntity, (school) => school.users)
  school: SchoolEntity;

  @OneToMany(() => GroupMemberEntity, (gm) => gm.user)
  groups: GroupMemberEntity[];

  @OneToMany(() => GroupRequestEntity, (gr) => gr.user)
  requests: GroupRequestEntity[];
}
