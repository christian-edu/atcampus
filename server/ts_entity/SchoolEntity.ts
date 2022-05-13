import { Column, Entity, OneToMany, PrimaryColumn } from "typeorm";
import { CriteriaEntity } from "./CriteriaEntity";
import { UserEntity } from "./UserEntity";

@Entity()
export class SchoolEntity {
  @PrimaryColumn()
  uuid: string;

  @Column({
    nullable: false,
    unique: true,
  })
  name: string;

  @OneToMany(() => CriteriaEntity, (criteria) => criteria.school_uuid, {
    lazy: true,
  })
  criteriaCollection: CriteriaEntity[];

  @OneToMany(() => UserEntity, (user) => user.school_uuid, { lazy: true })
  users: UserEntity[];
}
