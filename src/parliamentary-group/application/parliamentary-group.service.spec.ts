import { Test, TestingModule } from '@nestjs/testing';
import { Status } from '../../common/constants';
import { createParliamentaryGroupDtoMock } from '../domain/mocks/create-parliamentary-group.mock';
import { parliamentaryGroupEntityMock } from '../domain/mocks/parliamentary-group.entity.mock';
import { ParliamentaryGroupDatabaseService } from '../infrastructure/parliamentary-group.db.service';
import { ParliamentaryGroupDatabaseServiceMock } from '../infrastructure/parliamentary-group.db.service.mock';
import { ParliamentaryGroupService } from './parliamentary-group.service';

describe('ParliamentaryGroupService', () => {
  let service: ParliamentaryGroupService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ParliamentaryGroupService,
        {
          provide: ParliamentaryGroupDatabaseService,
          useClass: ParliamentaryGroupDatabaseServiceMock,
        },
      ],
    }).compile();

    service = module.get<ParliamentaryGroupService>(ParliamentaryGroupService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createParliamentaryGroup', () => {
    it(`should return ${Status.Added} as value of status`, async () => {
      expect(
        service.createParliamentaryGroup(createParliamentaryGroupDtoMock),
      ).resolves.toHaveProperty('status', Status.Added);
    });
  });

  describe('createParliamentaryGroupInDb', () => {
    it('should return an entity', async () => {
      expect(
        service.createParliamentaryGroupInDb(parliamentaryGroupEntityMock[0]),
      ).resolves.toEqual(parliamentaryGroupEntityMock[0]);
    });
  });

  describe('findParliamentaryGroupByAcronymInDb', () => {
    it('should return an entity', async () => {
      expect(
        service.findParliamentaryGroupByAcronymInDb(
          parliamentaryGroupEntityMock[0].acronym,
        ),
      ).resolves.toEqual(parliamentaryGroupEntityMock[0]);
    });
  });
});
