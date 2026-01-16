import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserResponseType } from './types/user.type';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async findAll(@Query('skip') skip = '0', @Query('take') take = '20'): Promise<{ users: UserResponseType[]; total: number }> {
    return this.usersService.findAll(+skip, +take);
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<{ user: UserResponseType }> {
    return this.usersService.findOne(id);
  }

  @Post()
  async create(@Body() dto: CreateUserDto): Promise<UserResponseType> {
    return this.usersService.create(dto);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() dto: UpdateUserDto) {
    return this.usersService.update(id, dto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @CurrentUser('userId') currentUserId: string) {
    return this.usersService.remove(id, currentUserId);
  }
}
