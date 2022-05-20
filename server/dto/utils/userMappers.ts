import { UserEntity } from "../../entity/UserEntity";
import { UserDto } from "../userDto";
import { SchoolEntity } from "../../entity/SchoolEntity";

export function userEntityToDto(entity: UserEntity): UserDto {
  return new UserDto(
    entity.userName,
    entity.email,
    entity.password,
    entity.school.name,
    entity.firstName,
    entity.lastName,
    entity.uuid
  );
}

export function userDtoToEntity(dto: UserDto): UserEntity {
  return new UserEntity(
    dto.username,
    dto.email,
    dto.password,
    dto.uuid,
    new SchoolEntity(dto.school),
    dto.firstName,
    dto.lastName
  );
}
