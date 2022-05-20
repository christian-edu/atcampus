export {};

declare global {
  namespace Express {
    interface Request {
      userId: string;
    }
  }
  namespace jwt {
    interface JwtPayload {
      userId: string;
    }
  }
}
