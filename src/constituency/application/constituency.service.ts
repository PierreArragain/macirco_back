import { Injectable, Logger } from '@nestjs/common';
import { ConstituencyEntity } from '../domain/constituency.entity';
import { ConstituencyFeatureDto } from '../domain/constituency.feature.dto';
import { ConstituencyDatabaseService } from '../infrastructure/constituency.db.service';

@Injectable()
export class ConstituencyService {
  private readonly logger = new Logger(ConstituencyService.name);

  constructor(
    private readonly constituencyDbService: ConstituencyDatabaseService,
  ) {}

  public async createConstituency(feature: ConstituencyFeatureDto) {
    try {
      const newConstituency = this.constituencyFeatureToEntity(feature);
      return this.createConstituencyInDb(newConstituency);
    } catch (error) {
      this.logger.error(
        `Error when trying to create a constituency : ${error.name} = ${error.message}`,
      );
      throw error;
    }
  }

  private constituencyFeatureToEntity(
    feature: ConstituencyFeatureDto,
  ): ConstituencyEntity {
    const constituencyEntity = {
      department: feature.properties.REF.slice(0, 3),
      code: feature.properties.REF,
      polygon: feature.geometry,
    } as ConstituencyEntity;
    return constituencyEntity;
  }

  private async createConstituencyInDb(
    newConstituency: ConstituencyEntity,
  ): Promise<ConstituencyEntity> {
    try {
      return this.constituencyDbService.createConstituency(newConstituency);
    } catch (error) {
      this.logger.error(
        `Error when trying to create a constituency : ${error.name} = ${error.message}`,
      );
      throw error;
    }
  }

  public findConstituencyByCodeInDb(
    code: string,
  ): Promise<ConstituencyEntity[]> {
    try {
      return this.constituencyDbService.getConstituencyByCode(code);
    } catch (error) {
      this.logger.error(
        `Error when trying to get a constituency : ${error.name} = ${error.message}`,
      );
      throw error;
    }
  }
}
