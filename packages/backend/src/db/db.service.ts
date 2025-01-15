import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import * as schema from './schema';

@Injectable()
export class DbService implements OnModuleInit {
  private pool: Pool;
  public readonly db: ReturnType<typeof drizzle<typeof schema>>;

  constructor(private configService: ConfigService) {
    this.pool = new Pool({
      connectionString: this.configService.get<string>('DATABASE_URL'),
    });
    this.db = drizzle(this.pool, { schema });
  }

  async onModuleInit() {
    // Test the connection
    await this.pool.query('SELECT 1');
  }

  async onModuleDestroy() {
    await this.pool.end();
  }

  get query() {
    return this.db.query;
  }

  get insert() {
    return this.db.insert;
  }

  get update() {
    return this.db.update;
  }

  get delete() {
    return this.db.delete;
  }
}
