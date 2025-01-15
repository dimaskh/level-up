import { Injectable, Inject } from '@nestjs/common';
import { settings } from '../../../db/schema';
import { eq } from 'drizzle-orm';
import { CreateSettingsDto, UpdateSettingsDto } from '../dto/settings.dto';
import { DrizzleDatabase } from '../../../db/db.types';

@Injectable()
export class SettingsService {
  constructor(@Inject('DB') private readonly db: DrizzleDatabase) {}

  async getUserSettings(heroId: string) {
    const [result] = await this.db.query.settings.findMany({
      where: eq(settings.heroId, heroId),
      limit: 1,
    });
    return result;
  }

  async updateSettings(heroId: string, updateSettingsDto: UpdateSettingsDto) {
    const updateData: any = {};
    if (updateSettingsDto.theme) {
      updateData.theme = updateSettingsDto.theme;
    }
    if (updateSettingsDto.notifications) {
      updateData.notifications = updateSettingsDto.notifications;
    }
    updateData.updatedAt = new Date();

    const [result] = await this.db
      .update(settings)
      .set(updateData)
      .where(eq(settings.heroId, heroId))
      .returning();
    return result;
  }
}
