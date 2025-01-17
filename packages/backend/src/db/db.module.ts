import { Module, Global } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema';

@Global()
@Module({
  providers: [
    {
      provide: 'DB',
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const connectionString = configService.get<string>('DATABASE_URL');
        if (!connectionString) {
          throw new Error('DATABASE_URL is not defined');
        }
        
        const client = postgres(connectionString, { max: 1 });
        return drizzle(client, { schema });
      },
    },
  ],
  exports: ['DB'],
})
export class DbModule {}
