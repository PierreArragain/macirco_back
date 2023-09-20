import { parliamentaryGroupEntityMock } from '../../domain/mocks/parliamentary-group.entity.mock';

export class ParliamentaryGroupRepositoryMock {
  save = jest.fn().mockReturnValue(parliamentaryGroupEntityMock[0]);
  findOne = jest.fn().mockResolvedValue(parliamentaryGroupEntityMock[0]);
}
