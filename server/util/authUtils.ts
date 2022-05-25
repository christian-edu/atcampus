import jwt, { JwtPayload } from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
const protectedRoutes = new Array<HttpPath>();

export function verifyToken(req: Request, res: Response, next: NextFunction) {
  if (req.path.endsWith("/login")) {
    next();
    return;
  }
  const { auth_token } = req.signedCookies;
  if (!auth_token) {
    next();
    return;
  }
  try {
    const verifiedToken = jwt.verify(auth_token, process.env.JWT_KEY as string);
    req.userId = (verifiedToken as JwtPayload)?.userId;
    console.log(req.userId);
    next();
  } catch (e) {
    console.info("Token expired/not valid");
    res.clearCookie("auth_token");
    res.status(401);
    res.send();
  }
}
export class HttpPath {
  constructor(
    public path: string,
    public method: string,
    public authority: string[] | null = null
  ) {}
}

// todo: klasse som singleton, kan konfigureres i en config-fil og sette den som middleware i server elns?
export function setProtectedRoutes(
  req: Request,
  res: Response,
  next: NextFunction
) {
  let isProtected = false;
  protectedRoutes.push(new HttpPath("groups", "GET"));
  protectedRoutes.push(new HttpPath("groups", "POST"));
  protectedRoutes.push(new HttpPath("user", "GET"));
  for (const item of protectedRoutes) {
    console.log(item.path, item.method);
    if (
      req.path.toLowerCase().includes(item.path.toLowerCase()) &&
      req.method.toLowerCase() === item.method.toLowerCase()
    ) {
      isProtected = true;
      break;
    }
  }

  if (isProtected && !req.userId) {
    console.warn("Unauthorized");
    res.sendStatus(403);
  } else {
    console.info("Authorized");
    next();
  }
}
