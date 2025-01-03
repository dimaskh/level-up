import { pgTable, text, timestamp, uuid, integer, boolean, jsonb } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

// Hero table (formerly Adventurer)
export const heroes = pgTable('heroes', {
  id: uuid('id').defaultRandom().primaryKey(),
  email: text('email').notNull().unique(),
  password: text('password').notNull(),
  username: text('username').notNull().unique(),
  heroName: text('hero_name').notNull(),
  classId: uuid('class_id').references(() => characterClasses.id),
  level: integer('level').default(1).notNull(),
  xpPoints: integer('xp_points').default(0).notNull(),
  gold: integer('gold').default(0).notNull(),
  stats: jsonb('stats').$type<{
    strength: number,
    agility: number,
    intelligence: number,
    charisma: number
  }>().notNull().default({
    strength: 10,
    agility: 10,
    intelligence: 10,
    charisma: 10
  }),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// Character Classes
export const characterClasses = pgTable('character_classes', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: text('name').notNull().unique(),
  description: text('description').notNull(),
  abilities: jsonb('abilities').$type<string[]>().notNull(),
  startingStats: jsonb('starting_stats').$type<{
    strength: number,
    agility: number,
    intelligence: number,
    charisma: number
  }>().notNull(),
});

// Guilds
export const guilds = pgTable('guilds', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: text('name').notNull().unique(),
  description: text('description').notNull(),
  leaderHeroId: uuid('leader_hero_id').notNull().references(() => heroes.id),
  level: integer('level').default(1).notNull(),
  xpPoints: integer('xp_points').default(0).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// Guild Members
export const guildMembers = pgTable('guild_members', {
  id: uuid('id').defaultRandom().primaryKey(),
  guildId: uuid('guild_id').notNull().references(() => guilds.id),
  heroId: uuid('hero_id').notNull().references(() => heroes.id),
  role: text('role').notNull(), // 'member', 'officer', 'leader'
  joinedAt: timestamp('joined_at').defaultNow().notNull(),
});

// Quests
export const quests = pgTable('quests', {
  id: uuid('id').defaultRandom().primaryKey(),
  heroId: uuid('hero_id').notNull().references(() => heroes.id),
  title: text('title').notNull(),
  description: text('description'),
  type: text('type').notNull(), // 'daily', 'weekly', 'epic'
  difficulty: text('difficulty').notNull(), // 'novice', 'adept', 'expert', 'master', 'legendary'
  status: text('status').notNull().default('available'), // 'available', 'in_progress', 'completed', 'failed'
  rewards: jsonb('rewards').$type<{
    xp: number,
    gold: number,
    items?: { itemId: string, quantity: number }[]
  }>().notNull(),
  prerequisites: jsonb('prerequisites').$type<{
    quests?: string[],
    level?: number,
    stats?: Record<string, number>
  }>(),
  deadline: timestamp('deadline'),
  completedAt: timestamp('completed_at'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// Inventory Items
export const items = pgTable('items', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: text('name').notNull(),
  description: text('description').notNull(),
  type: text('type').notNull(), // 'equipment', 'consumable', 'quest_item', 'collectible'
  rarity: text('rarity').notNull(), // 'common', 'uncommon', 'rare', 'epic', 'legendary'
  effects: jsonb('effects').$type<{
    stats?: Record<string, number>,
    abilities?: string[]
  }>(),
  stackable: boolean('stackable').default(false).notNull(),
});

// Hero Inventory
export const heroInventory = pgTable('hero_inventory', {
  id: uuid('id').defaultRandom().primaryKey(),
  heroId: uuid('hero_id').notNull().references(() => heroes.id),
  itemId: uuid('item_id').notNull().references(() => items.id),
  quantity: integer('quantity').notNull().default(1),
  equipped: boolean('equipped').default(false).notNull(),
});

// Skill Trees
export const skillTrees = pgTable('skill_trees', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: text('name').notNull(),
  description: text('description').notNull(),
  category: text('category').notNull(), // 'combat', 'crafting', 'social', etc.
  prerequisites: jsonb('prerequisites').$type<{
    level?: number,
    skills?: string[]
  }>(),
});

// Skills
export const skills = pgTable('skills', {
  id: uuid('id').defaultRandom().primaryKey(),
  treeId: uuid('tree_id').notNull().references(() => skillTrees.id),
  name: text('name').notNull(),
  description: text('description').notNull(),
  level: integer('level').notNull(),
  effects: jsonb('effects').$type<{
    stats?: Record<string, number>,
    abilities?: string[]
  }>().notNull(),
  cost: integer('cost').notNull(),
  prerequisites: jsonb('prerequisites').$type<{
    skills?: string[],
    level?: number
  }>(),
});

// Hero Skills
export const heroSkills = pgTable('hero_skills', {
  id: uuid('id').defaultRandom().primaryKey(),
  heroId: uuid('hero_id').notNull().references(() => heroes.id),
  skillId: uuid('skill_id').notNull().references(() => skills.id),
  unlockedAt: timestamp('unlocked_at').defaultNow().notNull(),
});

// Achievements
export const achievements = pgTable('achievements', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: text('name').notNull(),
  description: text('description').notNull(),
  type: text('type').notNull(), // 'quest', 'combat', 'exploration', 'social', 'crafting'
  requirements: jsonb('requirements').$type<{
    quests?: string[],
    level?: number,
    stats?: Record<string, number>,
    items?: string[],
  }>(),
  rewards: jsonb('rewards').$type<{
    xp?: number,
    gold?: number,
    items?: { itemId: string, quantity: number }[],
  }>(),
});

// Hero Achievements
export const heroAchievements = pgTable('hero_achievements', {
  id: uuid('id').defaultRandom().primaryKey(),
  heroId: uuid('hero_id').notNull().references(() => heroes.id),
  achievementId: uuid('achievement_id').notNull().references(() => achievements.id),
  unlockedAt: timestamp('unlocked_at').defaultNow().notNull(),
});

// Relations
export const heroesRelations = relations(heroes, ({ many, one }) => ({
  quests: many(quests),
  inventory: many(heroInventory),
  class: one(characterClasses, {
    fields: [heroes.classId],
    references: [characterClasses.id],
  }),
  guildMemberships: many(guildMembers),
  achievements: many(heroAchievements),
}));

export const characterClassesRelations = relations(characterClasses, ({ many }) => ({
  heroes: many(heroes),
}));

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

export const skillTreeRelations = relations(skillTrees, ({ many }) => ({
  skills: many(skills),
}));

export const achievementsRelations = relations(achievements, ({ many }) => ({
  heroes: many(heroAchievements),
}));

export const heroAchievementsRelations = relations(heroAchievements, ({ one }) => ({
  hero: one(heroes, {
    fields: [heroAchievements.heroId],
    references: [heroes.id],
  }),
  achievement: one(achievements, {
    fields: [heroAchievements.achievementId],
    references: [achievements.id],
  }),
}));

export const guildRelations = relations(guilds, ({ many, one }) => ({
  members: many(guildMembers),
  leader: one(heroes, {
    fields: [guilds.leaderHeroId],
    references: [heroes.id],
  }),
}));

export const guildMembersRelations = relations(guildMembers, ({ one }) => ({
  guild: one(guilds, {
    fields: [guildMembers.guildId],
    references: [guilds.id],
  }),
  hero: one(heroes, {
    fields: [guildMembers.heroId],
    references: [heroes.id],
  }),
}));
