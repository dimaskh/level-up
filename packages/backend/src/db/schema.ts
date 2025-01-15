import { relations } from "drizzle-orm";
import {
  boolean,
  integer,
  jsonb,
  pgTable,
  text,
  timestamp,
  uuid,
  varchar,
  primaryKey,
  index as dbIndex,
} from "drizzle-orm/pg-core";
import type { InferSelectModel, InferInsertModel } from "drizzle-orm";

export const heroes = pgTable(
  "heroes",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    email: varchar("email", { length: 255 }).notNull().unique(),
    password: varchar("password", { length: 255 }).notNull(),
    heroName: varchar("hero_name", { length: 255 }).notNull().unique(),
    stats: jsonb("stats")
      .$type<{
        strength: number;
        dexterity: number;
        constitution: number;
        intelligence: number;
        wisdom: number;
        charisma: number;
      }>()
      .default({
        strength: 10,
        dexterity: 10,
        constitution: 10,
        intelligence: 10,
        wisdom: 10,
        charisma: 10,
      })
      .notNull(),
    level: integer("level").default(1).notNull(),
    xpPoints: integer("xp_points").default(0).notNull(),
    gold: integer("gold").default(0).notNull(),
    provider: varchar("provider", { length: 50 }).default("local").notNull(),
    providerId: varchar("provider_id", { length: 255 }),
    refreshToken: varchar("refresh_token", { length: 255 }),
    refreshTokenExpiresAt: timestamp("refresh_token_expires_at", { mode: 'date' }),
    lastLoginAt: timestamp("last_login_at", { mode: 'date' }),
    createdAt: timestamp("created_at", { mode: 'date' }).defaultNow().notNull(),
    updatedAt: timestamp("updated_at", { mode: 'date' }).defaultNow().notNull(),
  },
  (table) => ({
    emailIdx: dbIndex("heroes_email_idx").on(table.email),
    heroNameIdx: dbIndex("heroes_hero_name_idx").on(table.heroName),
    providerIdIdx: dbIndex("heroes_provider_id_idx").on(table.providerId),
  })
);

export const heroesRelations = relations(heroes, ({ many }) => ({
  quests: many(quests),
  inventory: many(heroInventory),
  achievements: many(heroAchievements),
}));

export type Hero = InferSelectModel<typeof heroes>;
export type NewHero = InferInsertModel<typeof heroes>;

export const characterClasses = pgTable("character_classes", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull().unique(),
  description: text("description").notNull(),
  abilities: jsonb("abilities").$type<string[]>().notNull(),
  startingStats: jsonb("starting_stats")
    .$type<{
      strength: number;
      agility: number;
      intelligence: number;
      charisma: number;
    }>()
    .notNull(),
});

export const quests = pgTable("quests", {
  id: uuid("id").defaultRandom().primaryKey(),
  heroId: uuid("hero_id")
    .notNull()
    .references(() => heroes.id),
  title: text("title").notNull(),
  description: text("description"),
  type: text("type").notNull(), 
  difficulty: text("difficulty").notNull(), 
  status: text("status").notNull().default("available"), 
  rewards: jsonb("rewards")
    .$type<{
      xp: number;
      gold: number;
      items?: { itemId: string; quantity: number }[];
    }>()
    .notNull(),
  prerequisites: jsonb("prerequisites").$type<{
    quests?: string[];
    level?: number;
    stats?: Record<string, number>;
  }>(),
  deadline: timestamp("deadline"),
  completedAt: timestamp("completed_at"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const items = pgTable("items", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  type: text("type").notNull(), 
  rarity: text("rarity").notNull(), 
  effects: jsonb("effects").$type<{
    stats?: Record<string, number>;
    abilities?: string[];
  }>(),
  stackable: boolean("stackable").default(false).notNull(),
});

export const heroInventory = pgTable("hero_inventory", {
  id: uuid("id").defaultRandom().primaryKey(),
  heroId: uuid("hero_id")
    .notNull()
    .references(() => heroes.id),
  itemId: uuid("item_id")
    .notNull()
    .references(() => items.id),
  quantity: integer("quantity").notNull().default(1),
  equipped: boolean("equipped").default(false).notNull(),
});

export const skillTrees = pgTable("skill_trees", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  category: text("category").notNull(), 
  prerequisites: jsonb("prerequisites").$type<{
    level?: number;
    skills?: string[];
  }>(),
});

export const skills = pgTable("skills", {
  id: uuid("id").defaultRandom().primaryKey(),
  treeId: uuid("tree_id")
    .notNull()
    .references(() => skillTrees.id),
  name: text("name").notNull(),
  description: text("description").notNull(),
  level: integer("level").notNull(),
  effects: jsonb("effects")
    .$type<{
      stats?: Record<string, number>;
      abilities?: string[];
    }>()
    .notNull(),
  cost: integer("cost").notNull(),
  prerequisites: jsonb("prerequisites").$type<{
    skills?: string[];
    level?: number;
  }>(),
});

export const heroSkills = pgTable("hero_skills", {
  id: uuid("id").defaultRandom().primaryKey(),
  heroId: uuid("hero_id")
    .notNull()
    .references(() => heroes.id),
  skillId: uuid("skill_id")
    .notNull()
    .references(() => skills.id),
  unlockedAt: timestamp("unlocked_at").defaultNow().notNull(),
});

export const achievements = pgTable("achievements", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  type: text("type").notNull(), 
  requirements: jsonb("requirements").$type<{
    quests?: string[];
    level?: number;
    stats?: Record<string, number>;
    items?: string[];
  }>(),
  rewards: jsonb("rewards").$type<{
    xp?: number;
    gold?: number;
    items?: { itemId: string; quantity: number }[];
  }>(),
});

export const heroAchievements = pgTable("hero_achievements", {
  id: uuid("id").defaultRandom().primaryKey(),
  heroId: uuid("hero_id")
    .notNull()
    .references(() => heroes.id),
  achievementId: uuid("achievement_id")
    .notNull()
    .references(() => achievements.id),
  unlockedAt: timestamp("unlocked_at").defaultNow().notNull(),
});

export const settings = pgTable("settings", {
  id: uuid("id").defaultRandom().primaryKey(),
  heroId: uuid("hero_id").references(() => heroes.id).notNull(),
  theme: text("theme").notNull().default("system"),
  notifications: jsonb("notifications").notNull().default({}),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const tasks = pgTable("tasks", {
  id: uuid("id").defaultRandom().primaryKey(),
  heroId: uuid("hero_id").references(() => heroes.id).notNull(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  status: text("status").notNull().default("todo"),
  dueDate: timestamp("due_date"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const questsRelations = relations(quests, ({ one }) => ({
  hero: one(heroes, {
    fields: [quests.heroId],
    references: [heroes.id],
  }),
}));

export const itemsRelations = relations(items, ({ many }) => ({
  inventory: many(heroInventory),
}));

export const heroInventoryRelations = relations(heroInventory, ({ one }) => ({
  hero: one(heroes, {
    fields: [heroInventory.heroId],
    references: [heroes.id],
  }),
  item: one(items, {
    fields: [heroInventory.itemId],
    references: [items.id],
  }),
}));

export const skillTreesRelations = relations(skillTrees, ({ many }) => ({
  skills: many(skills),
}));

export const skillsRelations = relations(skills, ({ one }) => ({
  skillTree: one(skillTrees, {
    fields: [skills.treeId],
    references: [skillTrees.id],
  }),
}));

export const achievementsRelations = relations(achievements, ({ many }) => ({
  heroes: many(heroAchievements),
}));

export const heroAchievementsRelations = relations(
  heroAchievements,
  ({ one }) => ({
    hero: one(heroes, {
      fields: [heroAchievements.heroId],
      references: [heroes.id],
    }),
    achievement: one(achievements, {
      fields: [heroAchievements.achievementId],
      references: [achievements.id],
    }),
  })
);

export const settingsRelations = relations(settings, ({ one }) => ({
  hero: one(heroes, {
    fields: [settings.heroId],
    references: [heroes.id],
  }),
}));

export const tasksRelations = relations(tasks, ({ one }) => ({
  hero: one(heroes, {
    fields: [tasks.heroId],
    references: [heroes.id],
  }),
}));
