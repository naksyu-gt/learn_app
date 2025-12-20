import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UsersUseCase {
    constructor(private readonly prisma: PrismaService) {}

    async list() {
        return this.prisma.user.findMany();
    }

    async create(name: string) {
        return this.prisma.user.create({ data: { name } });
    }
}
