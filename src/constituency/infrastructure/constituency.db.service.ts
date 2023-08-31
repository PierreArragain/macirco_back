import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ConstituencyEntity } from '../domain/constituency.entity';
import { ConstituencyRepository } from './constituency.repository';

@Injectable()
export class ConstituencyDatabaseService {
  private readonly logger = new Logger(ConstituencyDatabaseService.name);
  constructor(
    @InjectRepository(ConstituencyEntity)
    private readonly constituencyRepository: ConstituencyRepository,
  ) {}

  async createConstituency(
    newConstituency: ConstituencyEntity,
  ): Promise<ConstituencyEntity> {
    try {
      return this.constituencyRepository.save(newConstituency);
    } catch (error) {
      this.logger.error(
        `Error when trying to create a constituency : ${error.name} = ${error.message}`,
      );
      throw error;
    }
  }
}
