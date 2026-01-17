import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCallbackDto } from './dto/create-callback.dto';
import { CallbackResponseList, CallbackResponseType } from './types/index.type';
import { RequestWithUser } from 'src/common/types/index.type';

@Injectable()
export class CallbacksService {
    constructor(private readonly prismaService: PrismaService) {}

    async create(dto: CreateCallbackDto, user?: RequestWithUser['user'] | null): Promise<{ message: string }> {
        const callback = await this.prismaService.callbackRequest.create({
            data: {
                name: dto.name,
                phone: dto.phone,
                message: dto.message,
                userId: user?.userId || null,
            },
            select: { id: true, name: true, phone: true, message: true, }
        });

        return { message: 'Заявка успешно отправлена!' };
    }

    async findAll(): Promise<{ callbacks: CallbackResponseList }> {
        const [items, total] = await Promise.all([
            this.prismaService.callbackRequest.findMany({
                select: {
                    id: true,
                    name: true,
                    phone: true,
                    message: true,
                    processed: true,
                    createdAt: true,
                    user: { select: {
                        id: true,
                        email: true,
                        fullName: true,
                    }},
                },
            }),
            this.prismaService.callbackRequest.count(),
        ]);

        return { callbacks: { items, total } };
    }

    async remove(id: string): Promise<{ message: string }> {
        const existing = await this.prismaService.callbackRequest.findUnique({
            where: { id: id },
        });

        if (!existing) {
            throw new NotFoundException('Запись не найдена');
        }

        await this.prismaService.callbackRequest.delete({ where: { id: id } });
        return { message: 'Запись успешно удалена!' };
    }
}
