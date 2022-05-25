export class GroupMemberDto_user {
  constructor(
    public user_uuid: string,
    public user_name: string,
    public isAdmin: boolean
  ) {}
}

export class GroupMemberDto_group {
  constructor(
    public group_uuid: string,
    public group_name: string,
    public isAdmin: boolean
  ) {}
}

export class GroupMemberDto_both {
  constructor(
    public user_uuid: string,
    public user_name: string,
    public group_uuid: string,
    public group_name: string,
    public isAdmin: boolean
  ) {}
}
