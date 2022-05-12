import { Column, Entity, PrimaryColumn, Unique } from "typeorm";
import { IsEmail } from "class-validator";

@Entity()
@Unique(["username"]) // Usikker på om det er riktig
export class UserEntity {
  @PrimaryColumn()
  uuid: string;

  @Column({
    nullable: false,
  })
  username: string;

  @Column({
    nullable: false,
  })
  @IsEmail()
  email: string;

  @Column()
  first_name: string;

  @Column()
  last_name: string;

  // Mangler relations, fikser senere
}
