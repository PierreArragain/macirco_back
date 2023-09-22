import { Status } from '../../../common/constants';
import { constituencyEntityMock } from '../../domain/mocks/constituency.entity.mock';

export class ConstituencyServiceMock {
  createConstituency = jest.fn().mockResolvedValue({
    status: Status.Added,
    message: 'Constituency created',
  });
  findConstituencyByCodeInDb = jest
    .fn()
    .mockResolvedValue(constituencyEntityMock[0]);
}
