import { Controller, Get, Post, Body } from '@nestjs/common';
import { UsersUseCase } from './users.usecase';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('users')
export class UsersController {
    constructor(private readonly usersUseCase: UsersUseCase) {}

    @Get()
    async list() {
        return this.usersUseCase.list();
    }

    @Post()
    async create(@Body() dto: CreateUserDto) {
        return this.usersUseCase.create(dto.name);
    }
}
