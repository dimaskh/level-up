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
      description: 'A powerful spellcaster with mastery over arcane forces',
      abilities: ['Fireball', 'Frost Nova', 'Arcane Intellect'],
      startingStats: {
        strength: 6,
        agility: 8,
        intelligence: 18,
        charisma: 10
      }
    },
    {
      name: 'Rogue',
      description: 'A stealthy operative skilled in subterfuge and precision strikes',
      abilities: ['Stealth', 'Backstab', 'Pickpocket'],
      startingStats: {
        strength: 8,
        agility: 16,
        intelligence: 10,
        charisma: 12
      }
    }
  ]).returning();

  // Heroes
  const heroes = await db.insert(schema.heroes).values([
    {
      email: 'warrior@levelup.com',
      password: 'password123', // In production, this should be hashed
      username: 'mightywarrior',
      heroName: 'Thorgrim',
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
      password: 'password123',
      username: 'archmage',
      heroName: 'Elara',
      classId: classes[1].id,
      level: 4,
      xpPoints: 2000,
      gold: 800,
      stats: {
        strength: 6,
        agility: 9,
        intelligence: 20,
        charisma: 12
      }
    }
  ]).returning();

  // Items
  const items = await db.insert(schema.items).values([
    {
      name: 'Steel Sword',
      description: 'A well-crafted steel sword',
      type: 'equipment',
      rarity: 'common',
      effects: {
        stats: {
          strength: 2
        }
      },
      stackable: false
    },
    {
      name: 'Health Potion',
      description: 'Restores 50 health points',
      type: 'consumable',
      rarity: 'common',
      effects: {
        stats: {
          health: 50
        }
      },
      stackable: true
    }
  ]).returning();

  // Achievements
  const achievements = await db.insert(schema.achievements).values([
    {
      name: 'First Steps',
      description: 'Complete your first quest',
      type: 'quest',
      requirements: {
        quests: [],
        level: 1
      },
      rewards: {
        xp: 100,
        gold: 50
      }
    },
    {
      name: 'Novice Adventurer',
      description: 'Reach level 5',
      type: 'quest',
      requirements: {
        level: 5
      },
      rewards: {
        xp: 500,
        gold: 200
      }
    }
  ]).returning();

  // Hero Achievements
  await db.insert(schema.heroAchievements).values([
    {
      heroId: heroes[0].id,
      achievementId: achievements[0].id
    },
    {
      heroId: heroes[0].id,
      achievementId: achievements[1].id
    }
  ]);

  // Hero Inventory
  await db.insert(schema.heroInventory).values([
    {
      heroId: heroes[0].id,
      itemId: items[0].id,
      quantity: 1,
      equipped: true
    },
    {
      heroId: heroes[0].id,
      itemId: items[1].id,
      quantity: 5,
      equipped: false
    }
  ]);

  // Quests
  await db.insert(schema.quests).values([
    {
      heroId: heroes[0].id,
      title: 'Slay the Dragon',
      description: 'A fearsome dragon threatens the village',
      type: 'epic',
      difficulty: 'legendary',
      status: 'in_progress',
      rewards: {
        xp: 1000,
        gold: 500,
        items: [{ itemId: items[0].id, quantity: 1 }]
      }
    }
  ]);

  console.log('✅ Database seeded successfully!');
  
  await sql.end();
};

seedData().catch((err) => {
  console.error('Seeding failed:', err);
  process.exit(1);
});
