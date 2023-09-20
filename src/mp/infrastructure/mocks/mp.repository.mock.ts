import { mpEntityMock } from '../../domain/mocks/mp.entity.mock';

export class MpRepositoryMock {
  save = jest.fn().mockResolvedValue(mpEntityMock[0]);
  createQueryBuilder = jest.fn().mockReturnValue({
    where: jest.fn().mockReturnThis(),
    innerJoinAndSelect: jest.fn().mockReturnThis(),
    innerJoin: jest.fn().mockReturnThis(),
    addSelect: jest.fn().mockReturnThis(),
    getOne: jest.fn().mockResolvedValue(mpEntityMock[0]),
  });
}
