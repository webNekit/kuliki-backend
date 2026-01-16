import { ConflictException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UserResponseType } from './types/user.type';
import { hashString } from 'src/common/utils/hash.util';
import { Prisma } from '@prisma/client';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(dto: CreateUserDto): Promise<UserResponseType> {
    try {
      const user = await this.prismaService.user.create({
        data: {
          email: dto.email,
          password: await hashString(dto.password),
          fullName: dto.fullName,
          role: dto.role,
        },
        select: {
          id: true,
          fullName: true,
          email: true,
          role: true,
          createdAt: true,
          updatedAt: true,
        },
      });

      return user;
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2002'
      ) {
        throw new ConflictException(
          'Пользователь с таким email уже существует',
        );
      }
      throw error;
    }
  }

  async update(userId: string, dto: UpdateUserDto): Promise<{ user: UserResponseType }> {
    const data: Partial<Prisma.UserUpdateInput> = {};

    if (dto.role) data.role = dto.role;
    if (dto.email) data.email = dto.email;
    if (dto.fullName) data.fullName = dto.fullName;

    if (dto.password) {
      data.refreshToken = null;
      data.password = await hashString(dto.password);
    }

    const user = await this.prismaService.user.update({
      where: { id: userId },
      data: data,
      select: {
        id: true,
        email: true,
        fullName: true,
        role: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return { user: user };
  }

  async findOne(id: string): Promise<{ user: UserResponseType }> {
    const user = await this.prismaService.user.findUnique({
      where: { id },
      select: {
        id: true,
        email: true,
        fullName: true,
        role: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!user) {
      throw new NotFoundException('Пользователь не найден');
    }

    return { user: user };
  }

  async findAll(
    skip: number = 0,
    take: number = 20,
  ): Promise<{ users: UserResponseType[]; total: number }> {
    const [users, total] = await Promise.all([
      this.prismaService.user.findMany({
        select: {
          id: true,
          email: true,
          fullName: true,
          role: true,
          createdAt: true,
          updatedAt: true,
        },
        orderBy: { createdAt: 'desc' },
        skip: skip,
        take: take,
      }),
      this.prismaService.user.count(),
    ]);

    return { users: users, total: total };
  }

  async remove(userId: string, currentUserId: string): Promise<{ message: string }> {
    if (userId === currentUserId) {
      throw new ForbiddenException('Вы не можете удалить свой профиль!');
    }

    const user = await this.prismaService.user.findUnique({ where: { id: userId } });

    if (!user) {
      throw new NotFoundException(`Пользователь с id ${userId} не найден`);
    }

    await this.prismaService.user.delete({ where: { id: userId } });
    return { message: 'Пользователь успешно удален' };
  }
}
