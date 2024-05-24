import { Column, Entity, Generated } from "typeorm";

import { CoreEntity } from "./Core.entity";

@Entity({
  name: "users",
})
export class UserEntity extends CoreEntity {
  @Column({ name: "name", nullable: true })
  name: string;

  @Column({ name: "email", nullable: true })
  email: string;

  @Column({ name: "avatar", nullable: true })
  avatar: string;

  @Column({ name: "password", nullable: true })
  password: string;
}
