export class GroupMemberDto_user {
  constructor(public user: string, public isAdmin: boolean) {}
}

export class GroupMemberDto_group {
  constructor(public group: string, public isAdmin: boolean) {}
}

export class GroupMemberDto_both {
  constructor(
    public user: string,
    public group: string,
    public isAdmin: boolean
  ) {}
}
