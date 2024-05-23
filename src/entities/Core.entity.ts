import {
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity()
export class CoreEntity {
  @PrimaryGeneratedColumn("increment", { type: "bigint" })
  id: number;

  @CreateDateColumn({ name: "createAt", nullable: true })
  createdAt: Date;

  @UpdateDateColumn({ name: "updateAt", nullable: true })
  updateAt?: Date;

  @DeleteDateColumn({ name: "deleteAt", nullable: true })
  deleteAt?: Date;
}
