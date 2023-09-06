import { Injectable, Logger } from '@nestjs/common';
import { ConstituencyService } from '../../constituency/application/constituency.service';
import { ParliamentaryGroupService } from '../../parliamentary-group/application/parliamentary-group.service';
import { CreateMpDto } from '../domain/create-mp.dto';
import { MpEntity } from '../domain/mp.entity';
import { MpDatabaseService } from '../infrastructure/mp.db.service';

@Injectable()
export class MpService {
  private readonly logger = new Logger(MpService.name);

  constructor(
    private readonly mpDbService: MpDatabaseService,
    private readonly constituencyService: ConstituencyService,
    private readonly parliamentaryGroup: ParliamentaryGroupService,
  ) {}

  public async createMp(mp: CreateMpDto): Promise<MpEntity> {
    try {
      const mpEntity = this.createMpDtoToMpEntity(mp);
      mpEntity.constituencies =
        await this.constituencyService.findConstituencyByCodeInDb(
          mp.constituency,
        );
      mpEntity.parliamentaryGroup =
        await this.parliamentaryGroup.findParliamentaryGroupByAcronymInDb(
          mp.parliamentaryGroup,
        );
      return this.createMpInDb(mpEntity);
    } catch (error) {
      this.logger.error(
        `Error when trying to create a mp : ${error.name} = ${error.message}`,
      );
      throw error;
    }
  }

  private createMpDtoToMpEntity(mp: CreateMpDto): MpEntity {
    const mpEntity = new MpEntity();
    Object.assign(mpEntity, mp);
    mpEntity.inActivity = true;
    return mpEntity;
  }

  private async createMpInDb(mp: MpEntity): Promise<MpEntity> {
    try {
      return this.mpDbService.createMp(mp);
    } catch (error) {
      this.logger.error(
        `Error when trying to create a mp : ${error.name} = ${error.message}`,
      );
      throw error;
    }
  }

  public async findMpByCoordinatesInDb(
    coordinates: number[],
  ): Promise<MpEntity> {
    try {
      return this.mpDbService.getMpByCoordinates(coordinates);
    } catch (error) {
      this.logger.error(
        `Error when trying to get a mp : ${error.name} = ${error.message}`,
      );
      throw error;
    }
  }
}
