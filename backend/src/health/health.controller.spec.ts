import { Test, TestingModule } from '@nestjs/testing';
import { HealthController } from './health.controller';
import type { DbHealth } from './db-health.interface';
import type { RedisHealth } from './redis-health.interface';
import { DB_HEALTH, REDIS_HEALTH } from './tokens';

describe('HealthController', () => {
    let controller: HealthController;
    let dbHealth: jest.Mocked<DbHealth>;
    let redisHealth: jest.Mocked<RedisHealth>;

    beforeEach(async () => {
        dbHealth = {
            isUp: jest.fn(),
        };

        redisHealth = {
            isUp: jest.fn(),
        };

        const module: TestingModule = await Test.createTestingModule({
            controllers: [HealthController],
            providers: [
                { provide: DB_HEALTH, useValue: dbHealth },
                { provide: REDIS_HEALTH, useValue: redisHealth },
            ]
        }).compile();

        controller = module.get(HealthController);
    });

    it('DBとRedisが両方upなら status=ok', async () => {
        dbHealth.isUp.mockResolvedValue(true);
        redisHealth.isUp.mockResolvedValue(true);
    
        const result = await controller.health();
    
        expect(result).toEqual({
          status: 'ok',
          db: 'up',
          redis: 'up',
        });
      });
    
      it('DBがdownなら status=degraded', async () => {
        dbHealth.isUp.mockResolvedValue(false);
        redisHealth.isUp.mockResolvedValue(true);
    
        const result = await controller.health();
    
        expect(result).toEqual({
          status: 'degraded',
          db: 'down',
          redis: 'up',
        });
      });
    
      it('Redisがdownなら status=degraded', async () => {
        dbHealth.isUp.mockResolvedValue(true);
        redisHealth.isUp.mockResolvedValue(false);
    
        const result = await controller.health();
    
        expect(result).toEqual({
          status: 'degraded',
          db: 'up',
          redis: 'down',
        });
    });
})