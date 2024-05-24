import { UserEntity } from "@/entities";
import { DBConnect } from "../dbConnector";

export const getUserRepository = async () => {
  const connection = await DBConnect.getConnection();
  return connection.getRepository(UserEntity);
};
