import { mpEntityMock } from '../../domain/mocks/mp.entity.mock';

export class MpDatabaseServiceMock {
  createMp = jest.fn().mockResolvedValue(mpEntityMock[0]);
  getMpByCoordinates = jest.fn().mockResolvedValue(mpEntityMock[0]);
  getMpById = jest.fn().mockImplementation((idMp: number) => {
    return Promise.resolve(mpEntityMock.find((mp) => mp.idMp === idMp));
  });
}
