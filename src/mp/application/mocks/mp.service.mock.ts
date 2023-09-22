import { Status } from '../../../common/constants';
import { mpEntityMock } from '../../domain/mocks/mp.entity.mock';
import { mpResultDtoMock } from '../../domain/mocks/mp.mock';

export class MpServiceMock {
  createMp = jest
    .fn()
    .mockResolvedValue({ status: Status.Added, message: 'Mp created' });
  findMpDtoById = jest.fn().mockResolvedValue(mpResultDtoMock);
  createMpInDb = jest.fn().mockResolvedValue(mpEntityMock[0]);
  mpEntityToMpResultDto = jest.fn().mockResolvedValue(mpResultDtoMock);
  findMpByCoordinatesInDb = jest.fn().mockResolvedValue(mpEntityMock[0]);
  findMpByIdInDb = jest.fn().mockImplementation((idMp: number) => {
    return Promise.resolve(mpEntityMock.find((mp) => mp.idMp === idMp));
  });
}
