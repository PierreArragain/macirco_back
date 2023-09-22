import { Test, TestingModule } from '@nestjs/testing';
import { MpServiceMock } from '../../mp/application/mocks/mp.service.mock';
import { MpService } from '../../mp/application/mp.service';
import { googleNewsMock } from '../../mp/domain/mocks/google-news.mock';
import { mpResultDtoMock } from '../../mp/domain/mocks/mp.mock';
import { GoogleNewsService } from '../../mp/infrastructure/google-news.service';
import { GoogleNewsServiceMock } from '../../mp/infrastructure/mocks/google-news.service.mock';
import { getMpDtoMock } from '../domain/mocks/getMpDto.mock';
import { AddressService } from '../infrastructure/address.service';
import { AddressServiceMock } from '../infrastructure/mocks/address.service.mock';
import { CustomResultsService } from './custom-results.service';

describe('CustomResultsService', () => {
  let service: CustomResultsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CustomResultsService,
        { provide: MpService, useClass: MpServiceMock },
        { provide: AddressService, useClass: AddressServiceMock },
        { provide: GoogleNewsService, useClass: GoogleNewsServiceMock },
      ],
    }).compile();

    service = module.get<CustomResultsService>(CustomResultsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getMpByAddress', () => {
    it('should return an mp result dto', async () => {
      expect(service.getMpByAddress(getMpDtoMock)).resolves.toEqual(
        mpResultDtoMock,
      );
    });
  });

  describe('getCoordinatesByAddress', () => {
    it('should return an array of coordinates', async () => {
      expect(service.getCoordinatesByAddress(getMpDtoMock)).resolves.toEqual([
        2.333029, 48.873827,
      ]);
    });
  });

  describe('getMpDtoToAddress', () => {
    it('should return an address', () => {
      expect(service.getMpDtoToAddress(getMpDtoMock)).toEqual(
        `${getMpDtoMock.streetNumber} ${getMpDtoMock.streetName} ${getMpDtoMock.postCode} ${getMpDtoMock.city}`.replace(
          / /g,
          '+',
        ),
      );
    });
  });

  describe('getMpNewsByAddress', () => {
    it('should return an array of google news dtos', async () => {
      expect(service.getMpNewsByAddress(getMpDtoMock)).resolves.toEqual(
        googleNewsMock,
      );
    });
  });

  describe('getMpNewsByMpId', () => {
    it('should return an array of google news dtos', async () => {
      expect(service.getMpNewsByMpId(1)).resolves.toEqual(googleNewsMock);
    });
  });

  describe('getMpNews', () => {
    it('should return an array of google news dtos', async () => {
      expect(service.getMpNews(mpResultDtoMock)).resolves.toEqual(
        googleNewsMock,
      );
    });
  });
});
