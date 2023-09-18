import { Status } from '../../../common/constants';

export class MpServiceMock {
  createMp = jest
    .fn()
    .mockResolvedValue({ status: Status.Added, message: 'Mp created' });
}
