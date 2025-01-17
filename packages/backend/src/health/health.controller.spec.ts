import { Test, TestingModule } from '@nestjs/testing';
import { HealthController } from './health.controller';

describe('HealthController', () => {
  let controller: HealthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HealthController],
    }).compile();

    controller = module.get<HealthController>(HealthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return health status with timestamp', () => {
    const result = controller.check();
    expect(result).toEqual({
      status: 'ok',
      timestamp: expect.any(String)
    });
    expect(new Date(result.timestamp).getTime()).toBeLessThanOrEqual(Date.now());
  });
});
