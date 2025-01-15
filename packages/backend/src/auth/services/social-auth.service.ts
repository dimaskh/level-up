import { Injectable, Inject } from '@nestjs/common';
import { OAuth2Client } from 'google-auth-library';
import { eq } from 'drizzle-orm';
import * as bcrypt from 'bcrypt';
import { DrizzleDatabase } from '../../db/db.types';
import { heroes, type Hero, type NewHero } from '../../db/schema';

export interface SocialProfile {
  email: string;
  name: string;
  providerId: string;
}

type UpdateSocialFields = Partial<{
  provider: string;
  providerId: string;
}>;

@Injectable()
export class SocialAuthService {
  private googleClient: OAuth2Client;

  constructor(@Inject('DRIZZLE_DB') private db: DrizzleDatabase) {
    this.googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
  }

  async verifyGoogleToken(token: string): Promise<SocialProfile> {
    const ticket = await this.googleClient.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    if (!payload) {
      throw new Error('Invalid Google token');
    }

    return {
      email: payload.email!,
      name: payload.name || payload.email!.split('@')[0],
      providerId: payload.sub,
    };
  }

  async verifyAppleToken(token: string): Promise<SocialProfile> {
    // Apple sign-in will be implemented later
    throw new Error('Apple sign in not implemented yet');
  }

  async findOrCreateHero(profile: SocialProfile, provider: string) {
    const hero = await this.db.query.heroes.findFirst({
      where: eq(heroes.email, profile.email),
    });

    if (hero) {
      // Update provider info if not set
      if (!hero.provider || !hero.providerId) {
        const updateData: UpdateSocialFields = {
          provider,
          providerId: profile.providerId,
        };

        await this.db
          .update(heroes)
          .set(updateData as Partial<typeof heroes.$inferInsert>)
          .where(eq(heroes.id, hero.id));
      }
      return hero;
    }

    // Create new hero with random password
    const newHeroData = {
      email: profile.email,
      heroName: profile.name,
      password: await bcrypt.hash(Math.random().toString(36), 10),
      provider,
      providerId: profile.providerId,
    } as NewHero;

    const [newHero] = await this.db
      .insert(heroes)
      .values(newHeroData)
      .returning();

    return newHero;
  }
}
