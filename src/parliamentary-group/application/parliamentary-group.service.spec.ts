import { Test, TestingModule } from '@nestjs/testing';
import { ParliamentaryGroupService } from './parliamentary-group.service';

describe('ParliamentaryGroupService', () => {
  let service: ParliamentaryGroupService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ParliamentaryGroupService],
    }).compile();

    service = module.get<ParliamentaryGroupService>(ParliamentaryGroupService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
