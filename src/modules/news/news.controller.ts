import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { NewsService } from './news.service';
import { ConfigService } from '@nestjs/config';
import { CreateNewsDto } from './dto/create-news.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { multerImageOptions } from 'src/common/utils/file-upload.util';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { Roles } from 'src/common/decorators/roles.decorator';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { AppRole } from 'src/common/types/index.type';
import { NewsQueryParams } from './types/index.type';
import { UpdateNewsDto } from './dto/update-news.dto';

@Controller('news')
export class NewsController {
  constructor(
    private readonly newsService: NewsService,
    private readonly configService: ConfigService,
  ) {}

  @Post()
  @Roles(AppRole.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @UseInterceptors(FileInterceptor('image'))
  async create(@Body() dto: CreateNewsDto, @UploadedFile() file: Express.Multer.File, @CurrentUser('userId') authorId: string) {
    return this.newsService.create(dto, file, authorId);
  }

  @Patch(':id')
  @Roles(AppRole.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @UseInterceptors(FileInterceptor('image', multerImageOptions(new ConfigService())))
  async update(@Param('id') id: string, @Body() dto: UpdateNewsDto, @UploadedFile() file?: Express.Multer.File) {
    return this.newsService.update(id, dto, file);
  }

  @Delete(':id')
  @Roles(AppRole.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async remove(@Param('id') id: string) {
    return this.newsService.remove(id);
  }

  @Get()
  async findAll(@Query() query: any) {
    return this.newsService.findAll({
      categoryId: query.newsCategory,
      published: query.published === 'true' ? true : query.published === 'false' ? false : undefined,
      page: Number(query.page) || 1,
      limit: Number(query.limit) || 10,
      sortBy: query.sortBy,
      order: query.order,
    });
  }

  @Get(':slug')
  async findOne(@Param('slug') slug: string) {
    return this.newsService.findOne(slug);
  }
}
