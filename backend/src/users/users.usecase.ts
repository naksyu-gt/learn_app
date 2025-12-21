import { ConflictException, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UsersUseCase {
    constructor(private readonly prisma: PrismaService) {}

    async list() {
        return this.prisma.user.findMany();
    }

    async create(name: string) {
        try {
            return await this.prisma.user.create({ data: { name } });
        } catch(e) {
            if (
                e instanceof Prisma.PrismaClientKnownRequestError &&
                e.code === 'P2002'
            ){
                throw new ConflictException('同じユーザー名が既に存在します。');
            } else {
                throw new Error(e.message);
            }
        }
    }
}
