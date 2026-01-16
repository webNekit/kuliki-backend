import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ConfigService } from '@nestjs/config';
import { CreateNewsDto } from './dto/create-news.dto';
import { NEWS_DEFAULTS, NEWS_ERRORS } from './constants/index.constant';
import { getImagePublicUrl } from 'src/common/utils/file-upload.util';
import { generateSlug } from 'src/common/utils/slug.util';
import { NewsItemResponse, NewsListResponse, NewsQueryParams } from './types/index.type';
import { Prisma } from '@prisma/client';

@Injectable()
export class NewsService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly configService: ConfigService,
  ) {}

  async create(dto: CreateNewsDto, file: Express.Multer.File | undefined, authorId: string): Promise<{ news: NewsItemResponse }> {
    if (!file) {
        throw new BadRequestException(NEWS_ERRORS.IMAGE_REQUIRED_ON_CREATE);
    }

    const imageUrl = getImagePublicUrl(file.filename, this.configService);

    const categoryExists = dto.categoryId
      ? await this.prismaService.newsCategory.findUnique({ where: { id: dto.categoryId } })
      : null;

      if (dto.categoryId && !categoryExists) {
        throw new BadRequestException(NEWS_ERRORS.CATEGORY_NOT_FOUND);
      }

      const news = await this.prismaService.news.create({
        data: {
          title: dto.title,
          slug: generateSlug(dto.title),
          content: dto.content,
          imageUrl: imageUrl,
          published: dto.published ?? false,
          publishedAt: new Date(),
          userId: authorId,
          categoryId: dto.categoryId ?? null,
        },
        include: {
          user: { select: { id: true, email: true, fullName: true } },
          newsCategory: { select: { id: true, title: true, slug: true } },
        },
      });

      return { news: news };
  }

  async findAll(query: NewsQueryParams): Promise<{ news: NewsListResponse }> {
    const { page = NEWS_DEFAULTS.PAGE, limit = NEWS_DEFAULTS.LIMIT, categoryId, sortBy, order } = query;
    const skip = (page - 1) * limit;
  
    const [items, total] = await Promise.all([
      this.prismaService.news.findMany({
        where: {
          categoryId: categoryId ?? undefined,
          published: true,
        },
        skip,
        take: Math.min(limit, NEWS_DEFAULTS.MAX_LIMIT),
        orderBy: { [sortBy || NEWS_DEFAULTS.SORT_BY]: order || NEWS_DEFAULTS.SORT_ORDER },
        include: {
          user: { select: { id: true, email: true, fullName: true } },
          newsCategory: { select: { id: true, title: true, slug: true } },
        },
      }),
      this.prismaService.news.count({
        where: {
          categoryId: categoryId ?? undefined,
          published: true,
        },
      }),
    ]);
  
    return {
      news: {
        items,
        total,
        page,
        limit,
        pages: Math.ceil(total / limit),
      },
    };
  }
  
}
