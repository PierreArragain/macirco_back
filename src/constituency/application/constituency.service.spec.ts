import { Test, TestingModule } from '@nestjs/testing';
import { constituencyEntityMock } from '../domain/mocks/constituency.entity.mock';
import { ConstituencyDatabaseService } from '../infrastructure/constituency.db.service';
import { ConstituencyDatabaseServiceMock } from '../infrastructure/mocks/constituency.db.service.mock';
import { ConstituencyService } from './constituency.service';

describe('ConstituencyService', () => {
  let service: ConstituencyService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ConstituencyService,
        {
          provide: ConstituencyDatabaseService,
          useClass: ConstituencyDatabaseServiceMock,
        },
      ],
    }).compile();

    service = module.get<ConstituencyService>(ConstituencyService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createConstituencyInDb', () => {
    it('should return an entity', async () => {
      expect(
        service.createConstituencyInDb(constituencyEntityMock[0]),
      ).resolves.toEqual(constituencyEntityMock[0]);
    });
  });

  describe('findConstituencyByCodeInDb', () => {
    it('should return an entity', async () => {
      const code = '001-02';
      expect(service.findConstituencyByCodeInDb(code)).resolves.toEqual(
        constituencyEntityMock[0],
      );
    });
  });
});
