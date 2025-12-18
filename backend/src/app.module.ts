import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HealthController } from './health.controller';
import { DbHealthService } from './db-health.service';
import { RedisHealthSrvice } from './redis-health.service';

@Module({
    imports: [],
    controllers: [AppController, HealthController],
    providers: [AppService, DbHealthService, RedisHealthSrvice],
})
export class AppModule {}

