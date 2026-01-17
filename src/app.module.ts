import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './modules/prisma/prisma.module';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { NewsCategoriesModule } from './modules/news-categories/news-categories.module';
import { NewsModule } from './modules/news/news.module';
import { CallbacksModule } from './modules/callbacks/callbacks.module';
import * as path from 'path';
import { envConfig } from './common/config/env.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: envConfig.validationSchema,
    }),
    ServeStaticModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const uploadDir = configService.get<string>('UPLOAD_DIR') || 'uploads';
        const absolutePath = path.join(process.cwd(), uploadDir);

        return [
          {
            rootPath: absolutePath,
            serveRoot: '/uploads',
            serveStaticOptions: { index: false },
          },
        ];
      },
    }),
    PrismaModule,
    AuthModule,
    UsersModule,
    NewsCategoriesModule,
    NewsModule,
    CallbacksModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
