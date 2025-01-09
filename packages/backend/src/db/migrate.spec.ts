import postgres from 'postgres';
import { drizzle } from 'drizzle-orm/postgres-js';
import { migrate } from 'drizzle-orm/postgres-js/migrator';

jest.mock('postgres', () => jest.fn());
jest.mock('drizzle-orm/postgres-js', () => ({
  drizzle: jest.fn()
}));
jest.mock('drizzle-orm/postgres-js/migrator', () => ({
  migrate: jest.fn()
}));

describe('migrate', () => {
  const mockSql = {
    end: jest.fn(),
  };
  const mockDb = {};

  beforeEach(() => {
    process.env.DATABASE_URL = 'postgresql://test:test@localhost:5432/test';
    (postgres as unknown as jest.Mock).mockReturnValue(mockSql);
    (drizzle as unknown as jest.Mock).mockReturnValue(mockDb);
  });

  afterEach(() => {
    jest.clearAllMocks();
    delete process.env.DATABASE_URL;
  });

  it('should run migrations successfully', async () => {
    const { runMigrations } = await import('./migrate');
    await runMigrations();

    expect(postgres).toHaveBeenCalledWith(process.env.DATABASE_URL, { max: 1 });
    expect(drizzle).toHaveBeenCalledWith(mockSql);
    expect(migrate).toHaveBeenCalledWith(mockDb, { migrationsFolder: 'src/db/migrations' });
    expect(mockSql.end).toHaveBeenCalled();
  });

  it('should throw error if DATABASE_URL is not set', async () => {
    delete process.env.DATABASE_URL;
    const { runMigrations } = await import('./migrate');

    await expect(runMigrations()).rejects.toThrow('DATABASE_URL environment variable is not set');
  });
});
