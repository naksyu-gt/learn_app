import { Controller, Get } from '@nestjs/common';

@Controller('users')
export class UsersController {
    @Get()
    async list() {
        return [
            { id: 1, name: 'Alice' },
            { id: 2, name: 'Bob' },
            { id: 3, name: 'Miki' },
        ];
    }
}
