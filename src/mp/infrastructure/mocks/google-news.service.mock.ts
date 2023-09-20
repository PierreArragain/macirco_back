import {
  googleNewsMock,
  googleNewsRawResultsMock,
} from '../../domain/mocks/google-news.mock';

export class GoogleNewsServiceMock {
  searchInGoogleNews = jest.fn().mockResolvedValue(googleNewsRawResultsMock);
  displayResults = jest.fn().mockResolvedValue(googleNewsMock);
}
