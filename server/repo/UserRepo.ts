import { AppDataSource } from "../server";
import { UserEntity } from "../entity/UserEntity";

export const UserRepo = AppDataSource.getRepository(UserEntity);
