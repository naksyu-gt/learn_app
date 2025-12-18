export interface RedisHealth {
    isUp(): Promise<boolean>;
}