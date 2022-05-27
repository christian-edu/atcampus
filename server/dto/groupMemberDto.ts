export class GroupMemberDtoUser {
  constructor(
    public user_uuid: string,
    public user_name: string,
    public isAdmin: boolean
  ) {}
}

export class GroupMemberDtoGroup {
  constructor(
    public group_uuid: string,
    public group_name: string,
    public isAdmin: boolean
  ) {}
}

export class GroupMemberDtoBoth {
  constructor(
    public user_uuid: string,
    public user_name: string,
    public group_uuid: string,
    public group_name: string,
    public isAdmin: boolean
  ) {}
}
