import { Test } from '@nestjs/testing';
import {
  googleNewsMock,
  googleNewsRawResultsMock,
} from '../domain/mocks/google-news.mock';
import { GoogleNewsService } from './google-news.service';
import { GoogleNewsServiceMock } from './mocks/google-news.service.mock';

describe('GoogleNewsService', () => {
  let service: GoogleNewsService;
  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        { provide: GoogleNewsService, useClass: GoogleNewsServiceMock },
      ],
    }).compile();

    service = module.get<GoogleNewsService>(GoogleNewsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('searchInGoogleNews', () => {
    it('should return an array of raw google news results', async () => {
      expect(service.searchInGoogleNews('Jeanne Dupont')).resolves.toEqual(
        googleNewsRawResultsMock,
      );
    });
  });

  describe('displayResults', () => {
    it('should return an array of google news results dtos', async () => {
      expect(service.displayResults('Jeanne Dupont')).resolves.toEqual(
        googleNewsMock,
      );
    });
  });
});
