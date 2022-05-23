export class UserInDto {
  constructor(
    public username: string,
    public email: string,
    public password: string,
    public school?: string,
    public firstName?: string,
    public lastName?: string
  ) {}
}
