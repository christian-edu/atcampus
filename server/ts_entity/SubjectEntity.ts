import { Column, Entity, PrimaryColumn, Unique } from "typeorm";

@Entity()
@Unique(["name"]) // Usikker på om det er riktig
export class SubjectEntity {
  @PrimaryColumn()
  uuid: string;

  @Column({
    nullable: false,
  })
  name: string;

  // Mangler kanskje relations, fikser senere
}
