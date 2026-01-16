import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { NewsCategoriesService } from './news-categories.service';
import { CreateNewsCategoriesDto } from './dto/create-news-categories.dto';
import { UpdateNewsCategoriesDto } from './dto/update-news-categories.dto';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { Roles } from 'src/common/decorators/roles.decorator';
import { AppRole } from 'src/common/types/index.type';

@Controller('news-categories')
export class NewsCategoriesController {
  constructor(private readonly newsCategoriesService: NewsCategoriesService) {}

  @Post()
  @Roles(AppRole.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async create(@Body() dto: CreateNewsCategoriesDto) {
    return this.newsCategoriesService.create(dto);
  }

  @Patch(':id')
  @Roles(AppRole.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async update(@Param('id') id: string, @Body() dto: UpdateNewsCategoriesDto) {
    return this.newsCategoriesService.update(id, dto);
  }

  @Get()
  async findAll() {
    return this.newsCategoriesService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.newsCategoriesService.findOne(id);
  }

  @Delete(':id')
  @Roles(AppRole.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async remove(@Param('id') id: string) {
    return this.newsCategoriesService.remove(id);
  }
}
