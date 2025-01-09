import { Test, TestingModule } from '@nestjs/testing';
import { QuestsController } from './quests.controller';
import { QuestsService } from './quests.service';

const mockQuestsService = {
  findAll: jest.fn(),
  findOne: jest.fn(),
  findByHero: jest.fn(),
  create: jest.fn(),
  update: jest.fn(),
  remove: jest.fn(),
};

describe('QuestsController', () => {
  let controller: QuestsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [QuestsController],
      providers: [
        {
          provide: QuestsService,
          useValue: mockQuestsService,
        },
      ],
    }).compile();

    controller = module.get<QuestsController>(QuestsController);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
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
      mockQuestsService.findAll.mockResolvedValue(mockQuests);

      const result = await controller.findAll();
      expect(result).toEqual(mockQuests);
      expect(mockQuestsService.findAll).toHaveBeenCalled();
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
      mockQuestsService.findOne.mockResolvedValue(mockQuest);

      const result = await controller.findOne('1');
      expect(result).toEqual(mockQuest);
      expect(mockQuestsService.findOne).toHaveBeenCalledWith('1');
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
      mockQuestsService.findByHero.mockResolvedValue(mockQuests);

      const result = await controller.findByHero('hero1');
      expect(result).toEqual(mockQuests);
      expect(mockQuestsService.findByHero).toHaveBeenCalledWith('hero1');
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
      mockQuestsService.create.mockResolvedValue([mockQuest]);

      const result = await controller.create(mockQuest);
      expect(result).toEqual([mockQuest]);
      expect(mockQuestsService.create).toHaveBeenCalledWith(mockQuest);
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
      mockQuestsService.update.mockResolvedValue([mockQuest]);

      const result = await controller.update('1', mockQuest);
      expect(result).toEqual([mockQuest]);
      expect(mockQuestsService.update).toHaveBeenCalledWith('1', mockQuest);
    });
  });

  describe('remove', () => {
    it('should remove a quest', async () => {
      mockQuestsService.remove.mockResolvedValue([{ id: '1' }]);

      const result = await controller.remove('1');
      expect(result).toEqual([{ id: '1' }]);
      expect(mockQuestsService.remove).toHaveBeenCalledWith('1');
    });
  });
});
