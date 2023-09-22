import { Test, TestingModule } from '@nestjs/testing';
import { constituencyEntityMock } from '../domain/mocks/constituency.entity.mock';
import { constituencyFeatureDtoMock } from '../domain/mocks/create-constituency.mock';
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

  describe('createConstituency', () => {
    it('should return an object with status and message', async () => {
      expect(
        service.createConstituency(constituencyFeatureDtoMock),
      ).resolves.toHaveProperty('status');
      expect(
        service.createConstituency(constituencyFeatureDtoMock),
      ).resolves.toHaveProperty('message');
    });
  });

  describe('constituencyFeatureToEntity', () => {
    it('should return have constituency geometry properties', () => {
      expect(
        service.constituencyFeatureToEntity(constituencyFeatureDtoMock),
      ).toHaveProperty(
        'department',
        constituencyFeatureDtoMock.properties.REF.slice(0, 3),
      );
      expect(
        service.constituencyFeatureToEntity(constituencyFeatureDtoMock),
      ).toHaveProperty('code', constituencyFeatureDtoMock.properties.REF);
      expect(
        service.constituencyFeatureToEntity(constituencyFeatureDtoMock),
      ).toHaveProperty('polygon', constituencyFeatureDtoMock.geometry);
    });
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
      const code = '075-01';
      expect(service.findConstituencyByCodeInDb(code)).resolves.toEqual(
        constituencyEntityMock[0],
      );
    });
  });
});
