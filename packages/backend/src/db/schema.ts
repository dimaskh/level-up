import { pgTable, text, timestamp, uuid, integer, boolean } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

// Users table
export const users = pgTable('users', {
  id: uuid('id').defaultRandom().primaryKey(),
  email: text('email').notNull().unique(),
  password: text('password').notNull(),
  name: text('name').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
  xpPoints: integer('xp_points').default(0).notNull(),
  level: integer('level').default(1).notNull(),
});

// Tasks table
export const tasks = pgTable('tasks', {
  id: uuid('id').defaultRandom().primaryKey(),
  userId: uuid('user_id').notNull().references(() => users.id),
  title: text('title').notNull(),
  description: text('description'),
  priority: text('priority').notNull(), // 'low', 'medium', 'high'
  dueDate: timestamp('due_date'),
  status: text('status').notNull().default('todo'), // 'todo', 'in_progress', 'done'
  xpValue: integer('xp_value').default(10).notNull(),
  completed: boolean('completed').default(false).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// Achievements table
export const achievements = pgTable('achievements', {
  id: uuid('id').defaultRandom().primaryKey(),
  title: text('title').notNull(),
  description: text('description').notNull(),
  requirement: text('requirement').notNull(),
  xpValue: integer('xp_value').default(50).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// User Achievements (junction table)
export const userAchievements = pgTable('user_achievements', {
  id: uuid('id').defaultRandom().primaryKey(),
  userId: uuid('user_id').notNull().references(() => users.id),
  achievementId: uuid('achievement_id').notNull().references(() => achievements.id),
  unlockedAt: timestamp('unlocked_at').defaultNow().notNull(),
});

// Learning Paths table
export const learningPaths = pgTable('learning_paths', {
  id: uuid('id').defaultRandom().primaryKey(),
  title: text('title').notNull(),
  description: text('description').notNull(),
  totalSteps: integer('total_steps').notNull(),
  xpValue: integer('xp_value').default(100).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// User Learning Progress table
export const userLearningProgress = pgTable('user_learning_progress', {
  id: uuid('id').defaultRandom().primaryKey(),
  userId: uuid('user_id').notNull().references(() => users.id),
  learningPathId: uuid('learning_path_id').notNull().references(() => learningPaths.id),
  currentStep: integer('current_step').default(0).notNull(),
  completed: boolean('completed').default(false).notNull(),
  startedAt: timestamp('started_at').defaultNow().notNull(),
  completedAt: timestamp('completed_at'),
});

// Relations
export const usersRelations = relations(users, ({ many }) => ({
  tasks: many(tasks),
  achievements: many(userAchievements),
  learningProgress: many(userLearningProgress),
}));

export const tasksRelations = relations(tasks, ({ one }) => ({
  user: one(users, {
    fields: [tasks.userId],
    references: [users.id],
  }),
}));

export const achievementsRelations = relations(achievements, ({ many }) => ({
  users: many(userAchievements),
}));

export const learningPathsRelations = relations(learningPaths, ({ many }) => ({
  userProgress: many(userLearningProgress),
}));
