import { IsEnum, IsObject } from 'class-validator';

export enum Theme {
  SYSTEM = 'system',
  LIGHT = 'light',
  DARK = 'dark',
}

export class CreateSettingsDto {
  @IsEnum(Theme)
  theme: Theme;

  @IsObject()
  notifications: Record<string, any>;
}

export class UpdateSettingsDto {
  @IsEnum(Theme)
  theme?: Theme;

  @IsObject()
  notifications?: Record<string, any>;
}
