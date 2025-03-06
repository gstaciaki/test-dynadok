import { Entity, Column } from "typeorm";
import { BaseEntity } from "./_base/entity";

@Entity()
export class ClientEntity extends BaseEntity {
  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  phone: string;
}
