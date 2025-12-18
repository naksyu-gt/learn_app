import { Controller, Get } from '@nestjs/common';
import * as mysql from 'mysql2/promise';
import Redis from 'ioredis';

@Controller('health')
export class HealthController {
    @Get()
    async health() {
        const dbOk = await this.checkDb();
        const redisOk = await this.checkRedis(); // ← 追加

        const ok = dbOk && redisOk;

        return {
            status: ok ? 'ok' : 'degraded',
            db: dbOk ? 'up' : 'down',
            redis: redisOk ? 'up' : 'down',
        };
    }

    private async checkDb(): Promise<boolean> {
        try {
            const conn = await mysql.createConnection({
                host: process.env.DB_HOST,
                port: Number(process.env.DB_PORT || 3306),
                user: process.env.DB_USER,
                password: process.env.DB_PASSWORD,
                database: process.env.DB_NAME,
            });
            await conn.query('SELECT 1');
            await conn.end();
            return true;
        } catch {
            return false;
        }
    }

    private async checkRedis(): Promise<boolean> {
        const redis = new Redis({
            host: process.env.REDIS_HOST,
            port: Number(process.env.REDIS_PORT || 6379),
            lazyConnect: true,
            maxRetriesPerRequest: 0,
        });

        try {
            await redis.connect();
            const pong = await redis.ping();
            return pong === 'PONG';
        } catch {
            return false;
        } finally {
            redis.disconnect();
        }
    }
}
