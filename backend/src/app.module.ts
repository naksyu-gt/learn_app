import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HealthController } from './health.controller';
import { DbHealthService } from './db-health.service';
import { RedisHealthService } from './redis-health.service';
import { DB_HEALTH, REDIS_HEALTH } from './tokens';

@Module({
    imports: [],
    controllers: [AppController, HealthController],
    providers: [
        AppService, 
        {
            provide: REDIS_HEALTH,
            useClass: RedisHealthService
        },
        {
            provide: DB_HEALTH,
            useClass: DbHealthService
        }
    ],
})
export class AppModule {}
