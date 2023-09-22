import { Test, TestingModule } from '@nestjs/testing';
import { ConstituencyService } from '../../constituency/application/constituency.service';
import { ConstituencyServiceMock } from '../../constituency/application/mocks/constituency.service.mock';
import { ParliamentaryGroupServiceMock } from '../../parliamentary-group/application/mocks/parliamentary-group.service.mock';
import { ParliamentaryGroupService } from '../../parliamentary-group/application/parliamentary-group.service';
import { createMpDtoMock } from '../domain/mocks/create-mp.mock';
import { mpEntityMock } from '../domain/mocks/mp.entity.mock';
import { mpResultDtoMock } from '../domain/mocks/mp.mock';
import { MpDatabaseServiceMock } from '../infrastructure/mocks/mp.db.service.mock';
import { MpDatabaseService } from '../infrastructure/mp.db.service';
import { MpService } from './mp.service';

describe('MpService', () => {
  let service: MpService;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MpService,
        {
          provide: MpDatabaseService,
          useClass: MpDatabaseServiceMock,
        },
        { provide: ConstituencyService, useClass: ConstituencyServiceMock },
        {
          provide: ParliamentaryGroupService,
          useClass: ParliamentaryGroupServiceMock,
        },
      ],
    }).compile();

    service = module.get<MpService>(MpService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createMp', () => {
    it('should return an object with status and message', async () => {
      expect(service.createMp(createMpDtoMock)).resolves.toHaveProperty(
        'status',
      );
      expect(service.createMp(createMpDtoMock)).resolves.toHaveProperty(
        'message',
      );
    });
  });

  describe('createMpDtoToMpEntity', () => {
    it('should return an entity', () => {
      expect(service.createMpDtoToMpEntity(createMpDtoMock)).toEqual({
        surname: createMpDtoMock.surname,
        firstName: createMpDtoMock.firstName,
        gender: createMpDtoMock.gender,
        party: createMpDtoMock.party,
        profession: createMpDtoMock.profession,
        picture: createMpDtoMock.picture,
        inActivity: true,
        link: createMpDtoMock.link,
        email: createMpDtoMock.email,
      });
    });
  });

  describe('mpEntityToMpResultDto', () => {
    it('should return an mp result dto', () => {
      expect(service.mpEntityToMpResultDto(mpEntityMock[0])).toEqual(
        mpResultDtoMock,
      );
    });
  });

  describe('findMpDtoById', () => {
    it('should return an mp result dto', () => {
      const id = 1;
      expect(service.findMpDtoById(id)).resolves.toEqual(mpResultDtoMock);
    });
  });

  describe('createMpInDb', () => {
    it('should return an entity', () => {
      expect(service.createMpInDb(mpEntityMock[0])).resolves.toEqual(
        mpEntityMock[0],
      );
    });
  });

  describe('findMpByCoordinatesInDb', () => {
    it('should return an entity', () => {
      const coordinates = [2.3488, 48.8534];
      expect(service.findMpByCoordinatesInDb(coordinates)).resolves.toEqual(
        mpEntityMock[0],
      );
    });
  });

  describe('findMpByIdInDb', () => {
    it('should return an entity', () => {
      const id = 1;
      expect(service.findMpByIdInDb(id)).resolves.toEqual(mpEntityMock[0]);
    });
  });
});
