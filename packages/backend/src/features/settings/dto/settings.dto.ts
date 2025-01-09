import { IsEnum, IsObject, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export enum ThemeType {
  LIGHT = 'light',
  DARK = 'dark',
  SYSTEM = 'system',
}

export class NotificationsDto {
  email: boolean;
  push: boolean;
  desktop: boolean;
}

export class DisplayDto {
  @IsEnum(['compact', 'comfortable', 'spacious'])
  density: string;

  @IsEnum(['small', 'medium', 'large'])
  fontSize: string;
}

export class UpdateSettingsDto {
  @IsEnum(ThemeType)
  theme?: ThemeType;

  @IsObject()
  @ValidateNested()
  @Type(() => NotificationsDto)
  notifications?: NotificationsDto;

  @IsObject()
  @ValidateNested()
  @Type(() => DisplayDto)
  display?: DisplayDto;
}
