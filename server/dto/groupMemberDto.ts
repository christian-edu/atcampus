import {UserDto} from "./userDto";

export class GroupMemberDto {
    constructor(public user: UserDto, public isAdmin: boolean) {
    }
}