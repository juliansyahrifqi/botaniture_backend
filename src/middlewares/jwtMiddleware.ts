import { NextFunction, Request, Response } from "express";
import Jwt from "jsonwebtoken";

export function authenticateJWT(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers['authorization'];
  
  // Split Bearer
  const token = authHeader && authHeader.split(' ')[1];

  if(!token) {
    return res.status(401).json({ statusCode: 401, message: 'Token is Required'});
  }

  const tokenPayload = Jwt.verify(token, process.env.SECRET_KEY);

  if(!tokenPayload) {
    return res.status(403).json({ statusCode: 403, message: 'Invalid Token'});
  }

  next();
}