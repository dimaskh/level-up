import { Inject, Injectable } from '@nestjs/common';
import { eq } from 'drizzle-orm';
import type { PostgresJsDatabase } from 'drizzle-orm/postgres-js';
import * as schema from '../db/schema';

@Injectable()
export class QuestsService {
  constructor(
    @Inject('DB') private db: PostgresJsDatabase<typeof schema>,
  ) {}

  async findAll() {
    return this.db.query.quests.findMany({
      with: {
        hero: true,
      },
    });
  }

  async findOne(id: string) {
    return this.db.query.quests.findFirst({
      where: eq(schema.quests.id, id),
      with: {
        hero: true,
      },
    });
  }

  async findByHero(heroId: string) {
    return this.db.query.quests.findMany({
      where: eq(schema.quests.heroId, heroId),
      with: {
        hero: true,
      },
    });
  }

  async create(data: typeof schema.quests.$inferInsert) {
    return this.db.insert(schema.quests).values(data).returning();
  }

  async update(id: string, data: Partial<typeof schema.quests.$inferInsert>) {
    return this.db
      .update(schema.quests)
      .set(data)
      .where(eq(schema.quests.id, id))
      .returning();
  }

  async remove(id: string) {
    return this.db
      .delete(schema.quests)
      .where(eq(schema.quests.id, id))
      .returning();
  }
}
