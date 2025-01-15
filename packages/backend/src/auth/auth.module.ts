import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './controllers/auth.controller';
import { AuthService } from './services/auth.service';
import { SocialAuthService } from './services/social-auth.service';
import { DrizzleModule } from '../drizzle/drizzle.module';

@Module({
  imports: [
    ConfigModule,
    DrizzleModule,
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, SocialAuthService],
  exports: [AuthService],
})
export class AuthModule {}
