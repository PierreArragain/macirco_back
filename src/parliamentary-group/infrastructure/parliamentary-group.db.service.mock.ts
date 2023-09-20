import { parliamentaryGroupEntityMock } from '../domain/mocks/parliamentary-group.entity.mock';

export class ParliamentaryGroupDatabaseServiceMock {
  createParliamentaryGroup = jest
    .fn()
    .mockResolvedValue(parliamentaryGroupEntityMock[0]);

  getParliamentaryGroupByAcronym = jest
    .fn()
    .mockImplementation((acronym: string) => {
      return parliamentaryGroupEntityMock.find(
        (parliamentaryGroup) => parliamentaryGroup.acronym === acronym,
      );
    });
}
