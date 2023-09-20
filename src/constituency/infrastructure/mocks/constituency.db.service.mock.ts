import { constituencyEntityMock } from '../../domain/mocks/constituency.entity.mock';

export class ConstituencyDatabaseServiceMock {
  createConstituency = jest.fn().mockResolvedValue(constituencyEntityMock[0]);
  getConstituencyByCode = jest.fn().mockImplementation((code: string) => {
    return Promise.resolve(
      constituencyEntityMock.find((constituency) => constituency.code === code),
    );
  });
}
