import { Injectable, Logger } from '@nestjs/common';
import { Status } from '../../common/constants';
import { ResponseDto } from '../../common/dtos/response.dto';
import { CreateParliamentaryGroupDto } from '../domain/create-parliamentary-group.dto';
import { ParliamentaryGroupEntity } from '../domain/parliamentary-group.entity';
import { ParliamentaryGroupDatabaseService } from '../infrastructure/parliamentary-group.db.service';

@Injectable()
export class ParliamentaryGroupService {
  private readonly logger = new Logger(ParliamentaryGroupService.name);
  constructor(
    private readonly parliamentaryGroupDbService: ParliamentaryGroupDatabaseService,
  ) {}

  public async createParliamentaryGroup(
    parliamentaryGroup: CreateParliamentaryGroupDto,
  ): Promise<ResponseDto> {
    const response = new ResponseDto();
    try {
      const parliamentaryGroupEntity = {
        ...parliamentaryGroup,
      } as ParliamentaryGroupEntity;
      await this.createParliamentaryGroupInDb(parliamentaryGroupEntity);
      response.status = Status.Added;
      response.message = 'ParliamentaryGroup created';
    } catch (error) {
      this.logger.error(
        `Error when trying to create a parliamentaryGroup : ${error.name} = ${error.message}`,
      );
      response.status = Status.Error;
      response.message = 'Error when trying to create a parliamentaryGroup';
    }
    return response;
  }

  public async createParliamentaryGroupInDb(
    parliamentaryGroup: ParliamentaryGroupEntity,
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
