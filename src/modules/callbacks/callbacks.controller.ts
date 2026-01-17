import { Body, Controller, Delete, Get, Param, Post, UseGuards } from '@nestjs/common';
import { CallbacksService } from './callbacks.service';
import { CreateCallbackDto } from './dto/create-callback.dto';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { AppRole, RequestWithUser } from 'src/common/types/index.type';
import { Roles } from 'src/common/decorators/roles.decorator';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';

@Controller('callbacks')
export class CallbacksController {
  constructor(private readonly callbacksService: CallbacksService) {}

  @Post()
  async create(@Body() dto: CreateCallbackDto, @CurrentUser() user?: RequestWithUser['user']) {
    return this.callbacksService.create(dto, user || null);
  }

  @Get()
  @Roles(AppRole.USER)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async findAll() {
    return this.callbacksService.findAll();
  }

  @Delete(':id')
  @Roles(AppRole.USER)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async remove(@Param('id') id: string) {
    return this.callbacksService.remove(id);
  }
}
