import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DbModule } from './db/db.module';
import { AuthModule } from './auth/auth.module';
import { HealthModule } from './health/health.module';
import { SettingsModule } from './features/settings/settings.module';
import { TasksModule } from './features/tasks/tasks.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    DbModule,
    AuthModule,
    HealthModule,
    SettingsModule,
    TasksModule,
  ],
})
export class AppModule {}
