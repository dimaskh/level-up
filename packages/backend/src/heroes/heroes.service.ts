import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { eq } from 'drizzle-orm';
import type { PostgresJsDatabase } from 'drizzle-orm/postgres-js';
import * as schema from '../db/schema';

@Injectable()
export class HeroesService {
  constructor(
    @Inject('DB') private db: PostgresJsDatabase<typeof schema>,
  ) {}

  async findAll() {
    return this.db.query.heroes.findMany({
      with: {
        quests: true,
        inventory: true,
        achievements: true,
      },
    });
  }

  async findOne(id: string) {
    const hero = await this.db.query.heroes.findFirst({
      where: eq(schema.heroes.id, id),
      with: {
        quests: true,
        inventory: true,
        achievements: true,
      },
    });

    if (!hero) {
      throw new NotFoundException(`Hero with ID ${id} not found`);
    }

    return hero;
  }

  async create(data: typeof schema.heroes.$inferInsert) {
    return this.db.insert(schema.heroes).values(data).returning();
  }

  async update(id: string, data: Partial<typeof schema.heroes.$inferInsert>) {
    return this.db
      .update(schema.heroes)
      .set(data)
      .where(eq(schema.heroes.id, id))
      .returning();
  }

  async delete(id: string) {
    return this.db.delete(schema.heroes).where(eq(schema.heroes.id, id));
  }
}
