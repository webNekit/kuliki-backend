import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { NewsCategoriesResponse } from './types/index.type';
import { CreateNewsCategoriesDto } from './dto/create-news-categories.dto';
import { generateSlug } from 'src/common/utils/slug.util';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { UpdateNewsCategoriesDto } from './dto/update-news-categories.dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class NewsCategoriesService {
    constructor(private readonly prismaService: PrismaService) {}

    async findAll(): Promise<{ categories: NewsCategoriesResponse[] }> {
        const categories = await this.prismaService.newsCategory.findMany({
          orderBy: { createdAt: 'desc' },
          select: {
            id: true,
            title: true,
            slug: true,
            createdAt: true,
            updatedAt: true,
            news: {
              select: {
                id: true,
                title: true,
              },
            },
          },
        });

        return { categories: categories };
    }

    async findOne(id: string): Promise<{ category: NewsCategoriesResponse }> {
        const category = await this.prismaService.newsCategory.findUnique({
          where: { id: id },
          select: {
            id: true,
            title: true,
            slug: true,
            createdAt: true,
            updatedAt: true,
            news: {
                select: { id: true, title: true, slug: true },
            },
          },
        });

        if (!category) {
            throw new NotFoundException(`Категория с id ${id} не найдена`);
        }

        return { category: category };
    }

    async create(dto: CreateNewsCategoriesDto): Promise<{ category: NewsCategoriesResponse }> {
        let slug = dto.slug || generateSlug(dto.title);

        try {
          const category = await this.prismaService.newsCategory.create({
            data: {
              title: dto.title,
              slug: slug,
            },
            select: {
              id: true,
              title: true,
              slug: true,
              createdAt: true,
              updatedAt: true,
              news: {
                select: {
                  id: true,
                  title: true,
                },
              },
            },
          });

          return { category: category };
        } catch (error) {
          if (error instanceof PrismaClientKnownRequestError) {
            if (error.code === 'P2002') {
              throw new ConflictException(
                'Категория с таким slug уже существует!',
              );
            }
          }
          throw error;
        }
    }

    async update(id: string, dto: UpdateNewsCategoriesDto): Promise<{ category: NewsCategoriesResponse }> {
        const existing = await this.prismaService.newsCategory.findUnique({
            where: { id: id },
            select: { id: true, title: true, slug: true },
        });

        if (!existing) {
            throw new NotFoundException(`Категория с id ${id} не найдена`);
        }
        

        const data: Partial<Prisma.NewsCategoryUpdateInput> = {};

        if (dto.title) data.title = dto.title;
        if (dto.slug) {
            data.slug = dto.slug
        } else if (dto.title !== undefined) {
            data.slug = generateSlug(dto.title);
        }


        const category = await this.prismaService.newsCategory.update({
          where: { id: existing.id },
          data: data,
          select: {
            id: true,
            title: true,
            slug: true,
            createdAt: true,
            updatedAt: true,
            news: {
              select: {
                id: true,
                title: true,
              },
            },
          },
        });

        return { category: category };
    }

    async remove(id: string): Promise<{ message: string }> {
        const existing = await this.prismaService.newsCategory.findUnique({
            where: { id: id },
            select: { id: true, title: true, slug: true },
        });

        if (!existing) {
            throw new NotFoundException(`Категория с id ${id} не найдена!`);
        }

        await this.prismaService.newsCategory.delete({
            where: { id: id },
        });

        return { message: 'Категория удалена' };
    }
}
