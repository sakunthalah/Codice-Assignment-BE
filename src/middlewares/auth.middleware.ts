import jwt, { Secret, JwtPayload } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { SecretKey } from '../types/constants/constants';

export interface CustomRequest extends Request {
  token: string | JwtPayload;
}

const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    console.log(token);
    if (!token) {
      throw new Error();
    }
    const decoded = jwt.verify(token, SecretKey);
    (req as CustomRequest).token = decoded;
    next();
  } catch (err) {
    res.status(401).send('Please authenticate');
  }
};

export default authMiddleware;