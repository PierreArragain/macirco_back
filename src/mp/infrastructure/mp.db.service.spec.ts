import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { mpEntityMock } from '../domain/mocks/mp.entity.mock';
import { MpEntity } from '../domain/mp.entity';
import { MpRepositoryMock } from './mocks/mp.repository.mock';
import { MpDatabaseService } from './mp.db.service';

describe('MpDbService', () => {
  let service: MpDatabaseService;
  let repository: Repository<MpEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MpDatabaseService,
        {
          provide: getRepositoryToken(MpEntity),
          useClass: MpRepositoryMock,
        },
      ],
    }).compile();

    service = module.get<MpDatabaseService>(MpDatabaseService);

    repository = module.get<Repository<MpEntity>>(getRepositoryToken(MpEntity));
  });
  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createMp', () => {
    it('should return an entity', async () => {
      expect(service.createMp(mpEntityMock[0])).resolves.toEqual(
        mpEntityMock[0],
      );
      expect(repository.save).toBeCalledTimes(1);
    });
  });

  describe('getMpById', () => {
    it('should return an entity', async () => {
      expect(service.getMpById(1)).resolves.toEqual(mpEntityMock[0]);
      expect(repository.createQueryBuilder).toHaveBeenCalled();
    });
  });
});
