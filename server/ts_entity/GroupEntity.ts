import { Column, Entity, OneToOne, PrimaryColumn } from "typeorm";
import { CriteriaEntity } from "./CriteriaEntity";

@Entity()
export class GroupEntity {
  @PrimaryColumn()
  uuid: string;

  @Column({
    unique: true,
  })
  name: string;

  @Column({
    type: "text",
  })
  rules: string;

  @Column({
    default: false,
    name: "is_private",
  })
  isPrivate: boolean;

  @OneToOne(() => CriteriaEntity)
  criteria: CriteriaEntity;
}
