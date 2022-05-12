import { Column, Entity, PrimaryColumn, Unique } from "typeorm";

@Entity()
@Unique(["name"]) // Usikker på om det er riktig
export class GroupEntity {
  @PrimaryColumn()
  uuid: string;

  @Column()
  name: string;

  @Column()
  open_for_membership: boolean;

  @Column()
  private: boolean;

  // Mangler relations, fikser senere
}
