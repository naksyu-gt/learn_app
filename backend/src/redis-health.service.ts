import {Injectable} from '@nestjs/common';
import Redis from 'ioredis';

@Injectable()
export class RedisHealthSrvice {
    async isUp(): Promise<boolean>{
        const redis = new Redis({
            host: process.env.REDIS_HOST,
            port: Number(process.env.REDIS_PORT || 6379),
            lazyConnect: true,
            maxRetriesPerRequest: 0,
        });

        try{
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