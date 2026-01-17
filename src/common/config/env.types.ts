// src/common/config/env.types.ts
// Строгая типизация для NestJS ConfigService
// https://docs.nestjs.com/techniques/configuration#custom-validation

export interface EnvConfig {
  NODE_ENV: 'development' | 'production' | 'test';
  PORT: number;
  BASE_URL: string;

  DATABASE_URL: string;
  DATABASE_URL_PROD?: string;

  JWT_ACCESS_SECRET: string;
  JWT_REFRESH_SECRET: string;
  JWT_ACCESS_EXPIRES_IN: string;
  JWT_REFRESH_EXPIRES_IN: string;

  COOKIE_DOMAIN: string;
  COOKIE_SECURE: boolean;
  COOKIE_SAMESITE: 'strict' | 'lax' | 'none';

  UPLOAD_DIR: string;
  UPLOAD_MAX_SIZE: number;
  UPLOAD_ALLOWED_MIME_TYPES: string;

  CORS_ORIGIN?: string;
  RATE_LIMIT_WINDOW_MS?: number;
  RATE_LIMIT_MAX?: number;
}
