import { Controller, Get } from '@nestjs/common';
import { DbHealthService } from './db-health.service';
import { RedisHealthSrvice } from './redis-health.service';

@Controller('health')
export class HealthController {
    constructor(
        private readonly dbHealth: DbHealthService,
        private readonly redisHealth: RedisHealthSrvice,
    ) {}

    @Get()
    async health() {
        const [dbOk, redisOk] = await Promise.all([
            this.dbHealth.isUp(),
            this.redisHealth.isUp(),
        ]);

        const ok = dbOk && redisOk;

        return {
            status: ok ? 'ok' : 'degraded',
            db: dbOk ? 'up' : 'down',
            redis: redisOk ? 'up' : 'down',
        }
    }
}
