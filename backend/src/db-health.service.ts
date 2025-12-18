import { Injectable } from '@nestjs/common';
import * as mysql from 'mysql2/promise';
import { DbHealth } from './db-health.interface';

@Injectable()
export class DbHealthService implements DbHealth {
    async isUp(): Promise<boolean> {
        try{
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
}