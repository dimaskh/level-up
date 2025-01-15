import { Injectable, Inject } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { heroes } from '../../db/schema';
import { eq } from 'drizzle-orm';
import { DrizzleDatabase } from '../../db/db.types';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject('DB') private readonly db: DrizzleDatabase,
    configService: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_SECRET'),
    });
  }

  async validate(payload: any) {
    const [hero] = await this.db.query.heroes.findMany({
      where: eq(heroes.id, payload.sub),
      limit: 1,
    });

    const { password, ...result } = hero;
    return result;
  }
}
