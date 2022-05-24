export default interface IAuthService {
  authenticateUser(
    username: string | undefined,
    email: string | undefined,
    password: string
  ): Promise<string>;
}
