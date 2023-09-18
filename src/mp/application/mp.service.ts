import { Injectable, Logger } from '@nestjs/common';
import { Status } from '../../common/constants';
import { ResponseDto } from '../../common/dtos/response.dto';
import { ConstituencyService } from '../../constituency/application/constituency.service';
import { ParliamentaryGroupService } from '../../parliamentary-group/application/parliamentary-group.service';
import { CreateMpDto } from '../domain/create-mp.dto';
import { MpResultDto } from '../domain/mp-result.dto';
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

  public async createMp(mp: CreateMpDto): Promise<ResponseDto> {
    const response = new ResponseDto();
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
      const createdMp = await this.createMpInDb(mpEntity);
      response.status = Status.Added;
      response.message = 'Mp created';
    } catch (error) {
      this.logger.error(
        `Error when trying to create a mp : ${error.name} = ${error.message}`,
      );
      response.status = Status.Error;
      response.message = 'Error when trying to create a mp';
    }
    return response;
  }

  private createMpDtoToMpEntity(mp: CreateMpDto): MpEntity {
    const mpEntity = new MpEntity();
    Object.assign(mpEntity, mp);
    mpEntity.inActivity = true;
    return mpEntity;
  }

  public mpEntityToMpResultDto(mp: MpEntity): MpResultDto {
    const mpResultDto = new MpResultDto();
    mpResultDto.idMp = mp.idMp;
    mpResultDto.surname = mp.surname;
    mpResultDto.firstName = mp.firstName;
    mpResultDto.gender = mp.gender;
    mpResultDto.parliamentaryGroup = mp.parliamentaryGroup.name;
    mpResultDto.party = mp.party;
    mpResultDto.profession = mp.profession;
    mpResultDto.picture = mp.picture;
    mpResultDto.inActivity = mp.inActivity;
    mpResultDto.link = mp.link;
    mpResultDto.email = mp.email;
    mpResultDto.department = mp.constituencies[0].department;
    mpResultDto.constituency = mp.constituencies[0].code;
    mpResultDto.nosDeputesSlug = mp.nosDeputesSlug;

    return mpResultDto;
  }

  public async findMpDtoById(idMp: number): Promise<MpResultDto> {
    try {
      const mp = await this.findMpByIdInDb(idMp);
      return this.mpEntityToMpResultDto(mp);
    } catch (error) {
      this.logger.error(
        `Error when trying to get a mp : ${error.name} = ${error.message}`,
      );
      throw error;
    }
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

  public async findMpByIdInDb(idMp: number): Promise<MpEntity> {
    try {
      return this.mpDbService.getMpById(idMp);
    } catch (error) {
      this.logger.error(
        `Error when trying to get a mp : ${error.name} = ${error.message}`,
      );
      throw error;
    }
  }
}
