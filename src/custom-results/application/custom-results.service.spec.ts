import { Test, TestingModule } from '@nestjs/testing';
import { CustomResultsService } from './custom-results.service';

describe('CustomResultsService', () => {
  let service: CustomResultsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CustomResultsService],
    }).compile();

    service = module.get<CustomResultsService>(CustomResultsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
