import { Test, TestingModule } from '@nestjs/testing';
import { ParliamentaryGroupController } from './parliamentary-group.controller';

describe('ParliamentaryGroupController', () => {
  let controller: ParliamentaryGroupController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ParliamentaryGroupController],
    }).compile();

    controller = module.get<ParliamentaryGroupController>(
      ParliamentaryGroupController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
