import { Test, TestingModule } from '@nestjs/testing';
import { mpResultDtoMock } from '../../mp/domain/mocks/mp.mock';
import { CustomResultsService } from '../application/custom-results.service';
import { CustomResultsServiceMock } from '../domain/mocks/custom-results.service.mock';
import { getMpDtoMock } from '../domain/mocks/getMpDto.mock';
import { CustomResultsController } from './custom-results.controller';

describe('CustomResultsController', () => {
  let controller: CustomResultsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CustomResultsController],
      providers: [
        {
          provide: CustomResultsService,
          useClass: CustomResultsServiceMock,
        },
      ],
    }).compile();

    controller = module.get<CustomResultsController>(CustomResultsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getMpByAddress', () => {
    it('should return a mp', async () => {
      expect(controller.getMpByAddress(getMpDtoMock)).resolves.toEqual(
        mpResultDtoMock,
      );
    });
  });

  describe('getMpNewsByAddress', () => {
    it('should return news of Mp By Address', async () => {
      // result should be of type GoogleNewsDto[]
      const newsArray = await controller.getNews(getMpDtoMock);

      for (const news of newsArray) {
        expect(news).toHaveProperty('title');
        expect(news).toHaveProperty('link');
        expect(news).toHaveProperty('pubDate');
        expect(news).toHaveProperty('contentSnippet');
      }
    });
  });

  describe('getNewsByMpId', () => {
    it('should return news of Mp By Address', async () => {
      const idMp = 1;
      // result should be of type GoogleNewsDto[]
      const newsArray = await controller.getNewsByMpId(idMp);

      for (const news of newsArray) {
        expect(news).toHaveProperty('title');
        expect(news).toHaveProperty('link');
        expect(news).toHaveProperty('pubDate');
        expect(news).toHaveProperty('contentSnippet');
      }
    });
  });
});
