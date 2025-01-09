import { Test, TestingModule } from '@nestjs/testing';
import { HeroesService } from './heroes.service';
import { eq } from 'drizzle-orm';
import * as schema from '../db/schema';

describe('HeroesService', () => {
  let service: HeroesService;
  let mockDb: any;

  const mockHero = {
    id: '123',
    email: 'hero@example.com',
    username: 'testHero',
    heroName: 'Test Hero',
    level: 1,
    xpPoints: 0,
    gold: 100,
    stats: {
      strength: 10,
      agility: 10,
      intelligence: 10,
      charisma: 10,
    },
  };

  beforeEach(async () => {
    mockDb = {
      query: {
        heroes: {
          findMany: jest.fn().mockResolvedValue([mockHero]),
          findFirst: jest.fn().mockResolvedValue(mockHero),
        },
      },
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        HeroesService,
        {
          provide: 'DB',
          useValue: mockDb,
        },
      ],
    }).compile();

    service = module.get<HeroesService>(HeroesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of heroes', async () => {
      const result = await service.findAll();
      expect(result).toEqual([mockHero]);
      expect(mockDb.query.heroes.findMany).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a single hero', async () => {
      const result = await service.findOne('123');
      expect(result).toEqual(mockHero);
      expect(mockDb.query.heroes.findFirst).toHaveBeenCalledWith({
        where: eq(schema.heroes.id, '123'),
        with: expect.any(Object),
      });
    });

    it('should return null for non-existent hero', async () => {
      mockDb.query.heroes.findFirst.mockResolvedValueOnce(null);
      const result = await service.findOne('999');
      expect(result).toBeNull();
    });
  });
});
