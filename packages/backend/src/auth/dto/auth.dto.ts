import { IsEmail, IsString, MinLength, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SignUpDto {
  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsString()
  @MinLength(3)
  heroName: string;

  @ApiProperty()
  @IsString()
  @MinLength(6)
  password: string;
}

export class SignInDto {
  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsString()
  password: string;
}

export class RefreshTokenDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  refreshToken: string;
}

export class SocialSignInDto {
  @ApiProperty()
  @IsString()
  token: string;

  @ApiProperty({ enum: ['google', 'apple'] })
  @IsString()
  provider: 'google' | 'apple';
}

export class TokensResponseDto {
  @ApiProperty()
  accessToken: string;

  @ApiProperty()
  refreshToken: string;
}

export class AuthResponseDto {
  @ApiProperty()
  hero: any;

  @ApiProperty()
  tokens: TokensResponseDto;
}
