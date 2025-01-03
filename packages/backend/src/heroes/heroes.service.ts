import { Inject, Injectable } from '@nestjs/common';
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
        class: true,
        quests: true,
        inventory: {
          with: {
            item: true,
          },
        },
        achievements: {
          with: {
            achievement: true,
          },
        },
      },
    });
  }

  async findOne(id: string) {
    return this.db.query.heroes.findFirst({
      where: eq(schema.heroes.id, id),
      with: {
        class: true,
        quests: true,
        inventory: {
          with: {
            item: true,
          },
        },
        achievements: {
          with: {
            achievement: true,
          },
        },
      },
    });
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

  async remove(id: string) {
    return this.db
      .delete(schema.heroes)
      .where(eq(schema.heroes.id, id))
      .returning();
  }
}
