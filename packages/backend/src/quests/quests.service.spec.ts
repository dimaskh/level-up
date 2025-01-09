import { Test, TestingModule } from '@nestjs/testing';
import { QuestsService } from './quests.service';
import { eq } from 'drizzle-orm';
import * as schema from '../db/schema';

const mockDb = {
  query: {
    quests: {
      findMany: jest.fn(),
      findFirst: jest.fn(),
    },
  },
  insert: jest.fn().mockReturnThis(),
  values: jest.fn().mockReturnThis(),
  returning: jest.fn(),
  update: jest.fn().mockReturnThis(),
  set: jest.fn().mockReturnThis(),
  where: jest.fn().mockReturnThis(),
  delete: jest.fn().mockReturnThis(),
};

describe('QuestsService', () => {
  let service: QuestsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        QuestsService,
        {
          provide: 'DB',
          useValue: mockDb,
        },
      ],
    }).compile();

    service = module.get<QuestsService>(QuestsService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return all quests', async () => {
      const mockQuests = [
        {
          id: '1',
          heroId: 'hero1',
          title: 'Test Quest',
          type: 'daily',
          difficulty: 'novice',
          status: 'available',
          rewards: {
            xp: 100,
            gold: 50
          }
        },
      ];
      mockDb.query.quests.findMany.mockResolvedValue(mockQuests);

      const result = await service.findAll();
      expect(result).toEqual(mockQuests);
      expect(mockDb.query.quests.findMany).toHaveBeenCalledWith({
        with: {
          hero: true,
        },
      });
    });
  });

  describe('findOne', () => {
    it('should return a quest by id', async () => {
      const mockQuest = {
        id: '1',
        heroId: 'hero1',
        title: 'Test Quest',
        type: 'daily',
        difficulty: 'novice',
        status: 'available',
        rewards: {
          xp: 100,
          gold: 50
        }
      };
      mockDb.query.quests.findFirst.mockResolvedValue(mockQuest);

      const result = await service.findOne('1');
      expect(result).toEqual(mockQuest);
      expect(mockDb.query.quests.findFirst).toHaveBeenCalledWith({
        where: eq(schema.quests.id, '1'),
        with: {
          hero: true,
        },
      });
    });
  });

  describe('findByHero', () => {
    it('should return quests by hero id', async () => {
      const mockQuests = [
        {
          id: '1',
          heroId: 'hero1',
          title: 'Test Quest',
          type: 'daily',
          difficulty: 'novice',
          status: 'available',
          rewards: {
            xp: 100,
            gold: 50
          }
        },
      ];
      mockDb.query.quests.findMany.mockResolvedValue(mockQuests);

      const result = await service.findByHero('hero1');
      expect(result).toEqual(mockQuests);
      expect(mockDb.query.quests.findMany).toHaveBeenCalledWith({
        where: eq(schema.quests.heroId, 'hero1'),
        with: {
          hero: true,
        },
      });
    });
  });

  describe('create', () => {
    it('should create a quest', async () => {
      const mockQuest = {
        heroId: 'hero1',
        title: 'Test Quest',
        type: 'daily',
        difficulty: 'novice',
        status: 'available',
        rewards: {
          xp: 100,
          gold: 50
        }
      };
      mockDb.returning.mockResolvedValue([mockQuest]);

      const result = await service.create(mockQuest);
      expect(result).toEqual([mockQuest]);
      expect(mockDb.insert).toHaveBeenCalledWith(schema.quests);
      expect(mockDb.values).toHaveBeenCalledWith(mockQuest);
    });
  });

  describe('update', () => {
    it('should update a quest', async () => {
      const mockQuest = {
        title: 'Updated Quest',
        rewards: {
          xp: 200,
          gold: 100
        }
      };
      mockDb.returning.mockResolvedValue([mockQuest]);

      const result = await service.update('1', mockQuest);
      expect(result).toEqual([mockQuest]);
      expect(mockDb.update).toHaveBeenCalledWith(schema.quests);
      expect(mockDb.set).toHaveBeenCalledWith(mockQuest);
      expect(mockDb.where).toHaveBeenCalledWith(eq(schema.quests.id, '1'));
    });
  });

  describe('remove', () => {
    it('should remove a quest', async () => {
      mockDb.returning.mockResolvedValue([{ id: '1' }]);

      const result = await service.remove('1');
      expect(result).toEqual([{ id: '1' }]);
      expect(mockDb.delete).toHaveBeenCalledWith(schema.quests);
      expect(mockDb.where).toHaveBeenCalledWith(eq(schema.quests.id, '1'));
    });
  });
});
