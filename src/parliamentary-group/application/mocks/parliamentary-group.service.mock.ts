import { Status } from '../../../common/constants';

export class ParliamentaryGroupServiceMock {
  createParliamentaryGroup = jest.fn().mockResolvedValue({
    status: Status.Added,
    message: 'Parliamentary group created',
  });
}
