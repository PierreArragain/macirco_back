import { Test, TestingModule } from '@nestjs/testing';
import { CustomResultsController } from './custom-results.controller';

describe('CustomResultsController', () => {
  let controller: CustomResultsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CustomResultsController],
    }).compile();

    controller = module.get<CustomResultsController>(CustomResultsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
