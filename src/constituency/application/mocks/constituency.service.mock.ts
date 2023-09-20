import { Status } from '../../../common/constants';

export class ConstituencyServiceMock {
  createConstituency = jest
    .fn()
    .mockResolvedValue({
      status: Status.Added,
      message: 'Constituency created',
    });
}
