import { Column, Entity, OneToMany, PrimaryColumn } from "typeorm";
import { CriteriaEntity } from "./CriteriaEntity";
import { UserEntity } from "./UserEntity";
import { v4 as uuidv4 } from "uuid";

@Entity()
export class SchoolEntity {
  constructor(name = "Ikke satt") {
    this.uuid = uuidv4();
    this.name = name;
  }

  @PrimaryColumn()
  uuid: string;

  @Column({
    nullable: false,
    unique: true,
  })
  name: string;

  @OneToMany(() => CriteriaEntity, (criteria) => criteria.school, {
    lazy: true,
  })
  criteriaCollection: CriteriaEntity[] | undefined;

  @OneToMany(() => UserEntity, (user) => user.school, { lazy: true })
  users: UserEntity[] | undefined;
}
