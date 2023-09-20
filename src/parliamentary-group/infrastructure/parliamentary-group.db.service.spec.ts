import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { parliamentaryGroupEntityMock } from '../domain/mocks/parliamentary-group.entity.mock';
import { ParliamentaryGroupEntity } from '../domain/parliamentary-group.entity';
import { ParliamentaryGroupRepositoryMock } from './mocks/parliamentary-group.repository.mock';
import { ParliamentaryGroupDatabaseService } from './parliamentary-group.db.service';

describe('ParliamentaryGroupDbService', () => {
  let service: ParliamentaryGroupDatabaseService;
  let repository: Repository<ParliamentaryGroupEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ParliamentaryGroupDatabaseService,
        {
          provide: getRepositoryToken(ParliamentaryGroupEntity),
          useClass: ParliamentaryGroupRepositoryMock,
        },
      ],
    }).compile();

    service = module.get<ParliamentaryGroupDatabaseService>(
      ParliamentaryGroupDatabaseService,
    );

    repository = module.get<Repository<ParliamentaryGroupEntity>>(
      getRepositoryToken(ParliamentaryGroupEntity),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createParliamentaryGroup', () => {
    it('should return an entity', async () => {
      expect(
        service.createParliamentaryGroup(parliamentaryGroupEntityMock[0]),
      ).resolves.toEqual(parliamentaryGroupEntityMock[0]);
      expect(repository.save).toBeCalledTimes(1);
    });
  });

  describe('getParliamentaryGroupByAcronym', () => {
    it('should return an entity', async () => {
      const repositorySpy = jest.spyOn(repository, 'findOne');
      expect(
        service.getParliamentaryGroupByAcronym(
          parliamentaryGroupEntityMock[0].acronym,
        ),
      ).resolves.toEqual(parliamentaryGroupEntityMock[0]);
      expect(repositorySpy).toBeCalledWith({
        where: {
          acronym: parliamentaryGroupEntityMock[0].acronym,
        },
      });
    });

    describe('getParliamentaryGroupByAcronym', () => {
      it('should return an entity', async () => {
        const repositorySpy = jest.spyOn(repository, 'findOne');
        expect(
          service.getParliamentaryGroupByAcronym(
            parliamentaryGroupEntityMock[0].acronym,
          ),
        ).resolves.toEqual(parliamentaryGroupEntityMock[0]);
        expect(repositorySpy).toBeCalledWith({
          where: {
            acronym: parliamentaryGroupEntityMock[0].acronym,
          },
        });
      });
    });
  });
});
