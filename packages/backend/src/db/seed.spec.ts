import postgres from 'postgres';
import { drizzle } from 'drizzle-orm/postgres-js';

jest.mock('postgres', () => jest.fn());
jest.mock('drizzle-orm/postgres-js', () => ({
  drizzle: jest.fn()
}));

describe('seed', () => {
  const mockSql = {
    end: jest.fn(),
  };
  const mockDb = {
    insert: jest.fn().mockReturnThis(),
    values: jest.fn().mockReturnThis(),
    returning: jest.fn()
  };

  beforeEach(() => {
    process.env.DATABASE_URL = 'postgresql://test:test@localhost:5432/test';
    (postgres as unknown as jest.Mock).mockReturnValue(mockSql);
    (drizzle as unknown as jest.Mock).mockReturnValue(mockDb);

    // Mock the returning values for each insert operation
    mockDb.returning
      // Character Classes
      .mockResolvedValueOnce([
        { id: '1', name: 'Warrior' },
        { id: '2', name: 'Mage' },
        { id: '3', name: 'Rogue' }
      ])
      // Heroes
      .mockResolvedValueOnce([
        { id: '1', heroName: 'Thorgrim' },
        { id: '2', heroName: 'Elara' }
      ])
      // Items
      .mockResolvedValueOnce([
        { id: '1', name: 'Steel Sword' },
        { id: '2', name: 'Health Potion' }
      ])
      // Achievements
      .mockResolvedValueOnce([
        { id: '1', name: 'First Steps' },
        { id: '2', name: 'Novice Adventurer' }
      ]);
  });

  afterEach(() => {
    jest.clearAllMocks();
    delete process.env.DATABASE_URL;
  });

  it('should seed the database successfully', async () => {
    const { seedData } = await import('./seed');
    await seedData();

    // Verify postgres and drizzle were initialized correctly
    expect(postgres).toHaveBeenCalledWith(process.env.DATABASE_URL);
    expect(drizzle).toHaveBeenCalled();

    // Verify all inserts were called
    expect(mockDb.insert).toHaveBeenCalledTimes(7); // All tables should be inserted
    expect(mockDb.values).toHaveBeenCalledTimes(7);
    expect(mockDb.returning).toHaveBeenCalledTimes(4); // Only 4 tables use returning()

    // Verify database connection was closed
    expect(mockSql.end).toHaveBeenCalled();
  });

  it('should throw error if DATABASE_URL is not set', async () => {
    delete process.env.DATABASE_URL;
    const { seedData } = await import('./seed');

    await expect(seedData()).rejects.toThrow('DATABASE_URL environment variable is not set');
  });
});
