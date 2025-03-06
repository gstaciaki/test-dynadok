import { Entity, Column } from "typeorm";
import { BaseEntity } from "../../../../infrastructure/database/entities/_base/entity";

@Entity()
export class TestEntity extends BaseEntity {
  @Column()
  name: string;

  @Column()
  email: string;
}
