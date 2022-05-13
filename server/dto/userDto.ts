export class UserDto {
  constructor(
    public firstName: string,
    public lastName: string | null,
    public username: string,
    public email: string,
    public password: string
  ) {}
}
