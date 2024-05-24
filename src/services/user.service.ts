import { UserEntity } from "@/entities";
import { getUserRepository } from "@/utils";

export const createUser = async (
  data: Pick<UserEntity, "name" | "email" | "avatar" | "password">
): Promise<UserEntity | null> => {
  const userRepository = await getUserRepository();

  const newUser: UserEntity = new UserEntity();

  newUser.name = data.name;
  newUser.email = data.email;
  newUser.avatar = data.avatar;
  newUser.password = data.password;

  await userRepository.save(newUser);

  return newUser;
};

export const getUserFromEmail = async (
  email: string
): Promise<UserEntity | null> => {
  const userRepository = await getUserRepository();
  const userInfo: UserEntity | null = await userRepository.findOneBy({
    email: email,
  });

  return userInfo;
};
