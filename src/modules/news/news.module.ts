import { Module } from '@nestjs/common';
import { NewsService } from './news.service';
import { NewsController } from './news.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { NewsCategoriesModule } from '../news-categories/news-categories.module';

@Module({
  imports: [PrismaModule, NewsCategoriesModule],
  controllers: [NewsController],
  providers: [NewsService],
})
export class NewsModule {}
