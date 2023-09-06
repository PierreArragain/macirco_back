import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ParliamentaryGroupEntity } from '../domain/parliamentary-group.entity';
import { ParliamentaryGroupRepository } from './parliamentary-group.repository';

@Injectable()
export class ParliamentaryGroupDatabaseService {
  private readonly logger = new Logger(ParliamentaryGroupDatabaseService.name);
  constructor(
    @InjectRepository(ParliamentaryGroupEntity)
    private readonly parliamentaryGroupRepository: ParliamentaryGroupRepository,
  ) {}

  async createParliamentaryGroup(
    newParliamentaryGroup: ParliamentaryGroupEntity,
  ): Promise<ParliamentaryGroupEntity> {
    try {
      return this.parliamentaryGroupRepository.save(newParliamentaryGroup);
    } catch (error) {
      this.logger.error(
        `Error when trying to create a parliamentaryGroup : ${error.name} = ${error.message}`,
      );
      throw error;
    }
  }

  async getParliamentaryGroupByAcronym(
    acronym: string,
  ): Promise<ParliamentaryGroupEntity> {
    try {
      return this.parliamentaryGroupRepository.findOne({ where: { acronym } });
    } catch (error) {
      this.logger.error(
        `Error when trying to get a parliamentaryGroup : ${error.name} = ${error.message}`,
      );
      throw error;
    }
  }
}
