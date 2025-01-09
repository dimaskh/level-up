import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Settings } from '../entities/settings.entity';
import { UpdateSettingsDto } from '../dto/settings.dto';

@Injectable()
export class SettingsService {
  constructor(
    @InjectRepository(Settings)
    private settingsRepository: Repository<Settings>,
  ) {}

  async getUserSettings(userId: string): Promise<Settings> {
    return this.settingsRepository.findOne({
      where: { user: { id: userId } },
    });
  }

  async updateSettings(userId: string, updateSettingsDto: UpdateSettingsDto): Promise<Settings> {
    const settings = await this.getUserSettings(userId);
    const updatedSettings = {
      ...settings,
      ...updateSettingsDto,
      updatedAt: new Date(),
    };
    
    return this.settingsRepository.save(updatedSettings);
  }
}
