import { Module } from '@nestjs/common';
import { NewsService } from './news.service';
import { NewsController } from './news.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { NewsCategoriesModule } from '../news-categories/news-categories.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { multerImageOptions } from 'src/common/utils/file-upload.util';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [
    MulterModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return multerImageOptions(configService);
      },
    }),
    PrismaModule,
    NewsCategoriesModule,
  ],
  controllers: [NewsController],
  providers: [NewsService],
})
export class NewsModule {}
