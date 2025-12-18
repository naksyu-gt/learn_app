import { Controller, Get, Inject } from '@nestjs/common';
import type { DbHealth } from './db-health.interface';
import type { RedisHealth } from './redis-health.interface';
import { DB_HEALTH, REDIS_HEALTH } from './tokens';

@Controller('health')
export class HealthController {
    constructor(
        @Inject(DB_HEALTH) private readonly dbHealth: DbHealth,
        @Inject(REDIS_HEALTH)private readonly redisHealth: RedisHealth,
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
