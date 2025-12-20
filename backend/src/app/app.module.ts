import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HealthController } from '../health/health.controller';
import { DbHealthService } from '../health/db-health.service';
import { RedisHealthService } from '../health/redis-health.service';
import { DB_HEALTH, REDIS_HEALTH } from '../health/tokens';
import { UsersController } from '../users/users.controller';

@Module({
    imports: [],
    controllers: [AppController, HealthController, UsersController],
    providers: [
        AppService,
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
