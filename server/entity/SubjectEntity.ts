import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
export class SubjectEntity {
  @PrimaryColumn()
  uuid: string;

  @Column({
    nullable: false,
    unique: true,
  })
  name: string;
}
