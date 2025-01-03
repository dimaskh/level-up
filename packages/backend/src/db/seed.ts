import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema';
import * as dotenv from 'dotenv';

dotenv.config();

const seedData = async () => {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    throw new Error('DATABASE_URL environment variable is not set');
  }

  const sql = postgres(connectionString);
  const db = drizzle(sql, { schema });

  console.log('🌱 Seeding database...');

  // Character Classes
  const classes = await db.insert(schema.characterClasses).values([
    {
      name: 'Warrior',
      description: 'A mighty warrior skilled in combat and leadership',
      abilities: ['Charge', 'Battle Cry', 'Shield Wall'],
      startingStats: {
        strength: 15,
        agility: 10,
        intelligence: 8,
        charisma: 12
      }
    },
    {
      name: 'Mage',
      description: 'A powerful spellcaster with mastery over arcane arts',
      abilities: ['Fireball', 'Teleport', 'Arcane Shield'],
      startingStats: {
        strength: 6,
        agility: 8,
        intelligence: 18,
        charisma: 12
      }
    },
    {
      name: 'Rogue',
      description: 'A cunning expert in stealth and precision',
      abilities: ['Stealth', 'Backstab', 'Pickpocket'],
      startingStats: {
        strength: 8,
        agility: 16,
        intelligence: 12,
        charisma: 10
      }
    }
  ]).returning();

  // Heroes
  const heroes = await db.insert(schema.heroes).values([
    {
      email: 'warrior@levelup.com',
      password: 'hashed_password_1', // In real app, use proper password hashing
      username: 'mightywarrior',
      heroName: 'Thorgar the Brave',
      classId: classes[0].id,
      level: 5,
      xpPoints: 2500,
      gold: 1000,
      stats: {
        strength: 18,
        agility: 12,
        intelligence: 8,
        charisma: 14
      }
    },
    {
      email: 'mage@levelup.com',
      password: 'hashed_password_2',
      username: 'archmage',
      heroName: 'Elara the Wise',
      classId: classes[1].id,
      level: 4,
      xpPoints: 2000,
      gold: 800,
      stats: {
        strength: 6,
        agility: 9,
        intelligence: 20,
        charisma: 15
      }
    }
  ]).returning();

  // Quests
  await db.insert(schema.quests).values([
    {
      heroId: heroes[0].id,
      title: 'Defeat the Code Bug',
      description: 'Track down and eliminate a notorious bug in the codebase',
      type: 'daily',
      difficulty: 'adept',
      status: 'in_progress',
      rewards: {
        xp: 100,
        gold: 50
      }
    },
    {
      heroId: heroes[1].id,
      title: 'Refactor the Ancient Spells',
      description: 'Modernize the legacy code without breaking existing functionality',
      type: 'epic',
      difficulty: 'master',
      status: 'available',
      rewards: {
        xp: 500,
        gold: 200
      }
    }
  ]);

  // Achievements
  const achievements = await db.insert(schema.achievements).values([
    {
      name: 'First Quest',
      description: 'Complete your first quest',
      type: 'general',
      tier: 'bronze',
      hidden: false,
      requirements: {
        quests: ['any'],
        other: { completedQuests: 1 }
      },
      rewards: {
        xp: 50,
        gold: 100
      }
    },
    {
      name: 'Bug Hunter',
      description: 'Find and fix 10 bugs',
      type: 'combat',
      tier: 'silver',
      hidden: false,
      requirements: {
        other: { bugsFixed: 10 }
      },
      rewards: {
        xp: 200,
        gold: 300
      }
    }
  ]).returning();

  // Hero Achievements
  await db.insert(schema.heroAchievements).values([
    {
      heroId: heroes[0].id,
      achievementId: achievements[0].id,
      progress: { completedQuests: 1 }
    }
  ]);

  // Items
  const items = await db.insert(schema.items).values([
    {
      name: 'Debugger\'s Sword',
      description: 'A mighty sword that helps track down bugs',
      type: 'equipment',
      rarity: 'rare',
      effects: {
        stats: {
          strength: 5,
          intelligence: 3
        }
      },
      stackable: false
    },
    {
      name: 'Energy Potion',
      description: 'Restores energy during long coding sessions',
      type: 'consumable',
      rarity: 'common',
      effects: {
        stats: {
          intelligence: 2
        }
      },
      stackable: true
    }
  ]).returning();

  // Hero Inventory
  await db.insert(schema.heroInventory).values([
    {
      heroId: heroes[0].id,
      itemId: items[0].id,
      equipped: true
    },
    {
      heroId: heroes[1].id,
      itemId: items[1].id,
      quantity: 5
    }
  ]);

  console.log('✅ Database seeded successfully!');
  await sql.end();
};

seedData().catch((err) => {
  console.error('Seeding failed:', err);
  process.exit(1);
});
