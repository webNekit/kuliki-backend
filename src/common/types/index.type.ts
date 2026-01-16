import { Role } from '@prisma/client';
import { Request } from 'express';

export interface RequestWithUser extends Request {
  user: {
    userId: string;
    email: string;
    role: Role;
  };
}

export interface JwtPayload {
  sub: string;
  email: string;
  role: Role;
  iat?: number;
  exp?: number;
}

export enum AppRole {
  ADMIN = 'ADMIN',
  USER = 'USER',
}

export type RefreshToken = string;
