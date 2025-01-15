import { Module } from '@nestjs/common';
import { SettingsController } from './controllers/settings.controller';
import { SettingsService } from './services/settings.service';
import { DbModule } from '../../db/db.module';
import { AuthModule } from '../../auth/auth.module';

@Module({
  imports: [DbModule, AuthModule],
  controllers: [SettingsController],
  providers: [SettingsService],
})
export class SettingsModule {}
