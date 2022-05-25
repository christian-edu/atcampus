import { Column, Entity, PrimaryColumn } from "typeorm";
import { v4 as uuidv4 } from "uuid";

@Entity({ name: "subjects" })
export class SubjectEntity {
  constructor(name: string) {
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
}
