import { UserEntity } from "../../entity/UserEntity";
import { UserInDto, UserOutDto } from "../UserInOutDto";
import { SchoolEntity } from "../../entity/SchoolEntity";

export function userEntityToDto(entity: UserEntity): UserOutDto {
  return new UserOutDto(
    entity.uuid,
    entity.userName,
    entity.email,
    entity.school.name,
    entity.firstName,
    entity.lastName
  );
}

export function userDtoToEntity(dto: UserInDto): UserEntity {
  return new UserEntity(
    dto.username,
    dto.email,
    dto.password,
    new SchoolEntity(dto.school),
    dto.firstName,
    dto.lastName
  );
}
