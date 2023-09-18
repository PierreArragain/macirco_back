import { googleNewsMock } from '../../../mp/domain/mocks/google-news.mock';
import { mpResultDtoMock } from '../../../mp/domain/mocks/mp.mock';

export class CustomResultsServiceMock {
  getMpByAddress = jest.fn().mockResolvedValue(mpResultDtoMock);
  getMpNewsByAddress = jest.fn().mockResolvedValue(googleNewsMock);
}
