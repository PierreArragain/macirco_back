import { Injectable, Logger } from '@nestjs/common';
import { ParliamentaryGroupEntity } from '../domain/parliamentary-group.entity';
import { ParliamentaryGroupDatabaseService } from '../infrastructure/parliamentary-group.db.service';

@Injectable()
export class ParliamentaryGroupService {
  private readonly logger = new Logger(ParliamentaryGroupService.name);
  constructor(
    private readonly parliamentaryGroupDbService: ParliamentaryGroupDatabaseService,
  ) {}

  public async createParliamentaryGroup(
    parliamentaryGroup: any,
  ): Promise<ParliamentaryGroupEntity> {
    try {
      return this.createParliamentaryGroupInDb(parliamentaryGroup);
    } catch (error) {
      this.logger.error(
        `Error when trying to create a parliamentaryGroup : ${error.name} = ${error.message}`,
      );
      throw error;
    }
  }

  private async createParliamentaryGroupInDb(
    parliamentaryGroup: any,
  ): Promise<ParliamentaryGroupEntity> {
    try {
      return this.parliamentaryGroupDbService.createParliamentaryGroup(
        parliamentaryGroup,
      );
    } catch (error) {
      this.logger.error(
        `Error when trying to create a parliamentaryGroup : ${error.name} = ${error.message}`,
      );
      throw error;
    }
  }

  public async findParliamentaryGroupByAcronymInDb(
    acronym: string,
  ): Promise<ParliamentaryGroupEntity> {
    try {
      return this.parliamentaryGroupDbService.getParliamentaryGroupByAcronym(
        acronym,
      );
    } catch (error) {
      this.logger.error(
        `Error when trying to get a parliamentaryGroup : ${error.name} = ${error.message}`,
      );
      throw error;
    }
  }
}
