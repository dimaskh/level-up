import { Injectable, UnauthorizedException, Inject } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { eq, type SQL } from 'drizzle-orm';
import { randomBytes } from 'crypto';
import { DrizzleDatabase } from '../../db/db.types';
import { heroes, type Hero, type NewHero } from '../../db/schema';
import { SocialAuthService } from './social-auth.service';
import type { SocialProfile } from './social-auth.service';

type UpdateHeroFields = Partial<{
  refreshToken: string | null;
  refreshTokenExpiresAt: Date | null;
  lastLoginAt: Date | undefined;
}>;

@Injectable()
export class AuthService {
  private readonly REFRESH_TOKEN_TTL = 30 * 24 * 60 * 60 * 1000; // 30 days

  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly socialAuthService: SocialAuthService,
    @Inject('DRIZZLE_DB') private db: DrizzleDatabase,
  ) {}

  async register(email: string, password: string, heroName: string) {
    const hashedPassword = await bcrypt.hash(password, 10);

    const [hero] = await this.db
      .insert(heroes)
      .values({
        email,
        password: hashedPassword,
        heroName,
        provider: 'local',
      } as NewHero)
      .returning();

    const tokens = await this.generateTokens(hero.id);
    await this.updateRefreshToken(hero.id, tokens.refreshToken);

    return {
      hero,
      tokens,
    };
  }

  async login(email: string, password: string) {
    const hero = await this.db.query.heroes.findFirst({
      where: eq(heroes.email, email),
    });

    if (!hero) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(password, hero.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const tokens = await this.generateTokens(hero.id);
    await this.updateRefreshToken(hero.id, tokens.refreshToken);

    return {
      hero,
      tokens,
    };
  }

  async socialSignIn(token: string, provider: 'google' | 'apple') {
    let profile: SocialProfile;
    
    try {
      profile = await (provider === 'google'
        ? this.socialAuthService.verifyGoogleToken(token)
        : this.socialAuthService.verifyAppleToken(token));
    } catch (error) {
      throw new UnauthorizedException('Invalid social token');
    }

    const hero = await this.socialAuthService.findOrCreateHero(profile, provider);
    const tokens = await this.generateTokens(hero.id);
    await this.updateRefreshToken(hero.id, tokens.refreshToken);

    return {
      hero,
      tokens,
    };
  }

  async logout(heroId: string) {
    await this.updateRefreshToken(heroId, null);
  }

  async refreshToken(heroId: string, refreshToken: string) {
    const hero = await this.db.query.heroes.findFirst({
      where: eq(heroes.id, heroId),
    });

    if (!hero || !hero.refreshToken) {
      throw new UnauthorizedException('Invalid refresh token');
    }

    if (hero.refreshToken !== refreshToken) {
      throw new UnauthorizedException('Invalid refresh token');
    }

    if (
      hero.refreshTokenExpiresAt &&
      new Date(hero.refreshTokenExpiresAt) < new Date()
    ) {
      throw new UnauthorizedException('Refresh token expired');
    }

    const tokens = await this.generateTokens(hero.id);
    await this.updateRefreshToken(hero.id, tokens.refreshToken);

    return tokens;
  }

  private async generateTokens(heroId: string) {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        { sub: heroId },
        {
          secret: this.configService.get<string>('JWT_SECRET'),
          expiresIn: '15m',
        },
      ),
      this.generateRefreshToken(),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }

  private generateRefreshToken(): string {
    return randomBytes(40).toString('hex');
  }

  private async updateRefreshToken(heroId: string, refreshToken: string | null) {
    const updateData: UpdateHeroFields = {
      refreshToken,
      refreshTokenExpiresAt: refreshToken
        ? new Date(Date.now() + this.REFRESH_TOKEN_TTL)
        : null,
      lastLoginAt: refreshToken ? new Date() : undefined,
    };

    await this.db
      .update(heroes)
      .set(updateData as Partial<typeof heroes.$inferInsert>)
      .where(eq(heroes.id, heroId));
  }
}
