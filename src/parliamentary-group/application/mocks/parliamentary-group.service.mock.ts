import { Status } from '../../../common/constants';
import { parliamentaryGroupEntityMock } from '../../domain/mocks/parliamentary-group.entity.mock';

export class ParliamentaryGroupServiceMock {
  createParliamentaryGroup = jest.fn().mockResolvedValue({
    status: Status.Added,
    message: 'Parliamentary group created',
  });
  findParliamentaryGroupByAcronymInDb = jest
    .fn()
    .mockResolvedValue(parliamentaryGroupEntityMock);
}
