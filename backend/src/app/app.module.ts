import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HealthController } from '../health/health.controller';
import { DbHealthService } from '../health/db-health.service';
import { RedisHealthService } from '../health/redis-health.service';
import { DB_HEALTH, REDIS_HEALTH } from '../health/tokens';
import { UsersUseCase } from '../users/users.usecase';
import { UsersController } from '../users/users.controller';
import { PrismaService } from '../prisma/prisma.service';

@Module({
    imports: [],
    controllers: [AppController, HealthController, UsersController],
    providers: [
        AppService,
        PrismaService,
        UsersUseCase,
        {
            provide: REDIS_HEALTH,
            useClass: RedisHealthService,
        },
        {
            provide: DB_HEALTH,
            useClass: DbHealthService,
        },
    ],
})
export class AppModule {}
