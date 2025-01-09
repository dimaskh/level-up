import { Test, TestingModule } from '@nestjs/testing';
import { HeroesController } from './heroes.controller';
import { HeroesService } from './heroes.service';

describe('HeroesController', () => {
  let controller: HeroesController;
  let service: HeroesService;

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
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HeroesController],
      providers: [
        {
          provide: HeroesService,
          useValue: {
            findAll: jest.fn().mockResolvedValue([mockHero]),
            findOne: jest.fn().mockResolvedValue(mockHero),
          },
        },
      ],
    }).compile();

    controller = module.get<HeroesController>(HeroesController);
    service = module.get<HeroesService>(HeroesService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of heroes', async () => {
      const result = await controller.findAll();
      expect(result).toEqual([mockHero]);
      expect(service.findAll).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a single hero', async () => {
      const result = await controller.findOne('123');
      expect(result).toEqual(mockHero);
      expect(service.findOne).toHaveBeenCalledWith('123');
    });
  });
});
