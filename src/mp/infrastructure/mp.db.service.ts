import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MpEntity } from '../domain/mp.entity';
import { MpRepository } from './mp.repository';

@Injectable()
export class MpDatabaseService {
  private readonly logger = new Logger(MpDatabaseService.name);
  constructor(
    @InjectRepository(MpEntity)
    private readonly mpRepository: MpRepository,
  ) {}

  async createMp(newMp: MpEntity): Promise<MpEntity> {
    try {
      return this.mpRepository.save(newMp);
    } catch (error) {
      this.logger.error(
        `Error when trying to create a mp : ${error.name} = ${error.message}`,
      );
      throw error;
    }
  }

  async getMpByCoordinates(coordinates: number[]): Promise<MpEntity> {
    try {
      return this.mpRepository
        .createQueryBuilder('mp')
        .innerJoin('mp.constituencies', 'constituencies')
        .where(
          'ST_Intersects(constituencies.polygon, ST_SetSRID(ST_MakePoint(:longitude, :latitude), 4326))',
        )
        .setParameters({
          longitude: coordinates[0],
          latitude: coordinates[1],
        })
        .innerJoinAndSelect('mp.parliamentaryGroup', 'parliamentaryGroup')
        .addSelect(['constituencies.department', 'constituencies.code'])
        .getOne();
    } catch (error) {
      this.logger.error(
        `Error when trying to get a mp : ${error.name} = ${error.message}`,
      );
      throw error;
    }
  }

  async getMpById(idMp: number): Promise<MpEntity> {
    try {
      return this.mpRepository
        .createQueryBuilder('mp')
        .where('mp.idMp = :idMp', { idMp })
        .innerJoinAndSelect('mp.parliamentaryGroup', 'parliamentaryGroup')
        .innerJoin('mp.constituencies', 'constituencies')
        .addSelect(['constituencies.department', 'constituencies.code'])
        .getOne();
    } catch (error) {
      this.logger.error(
        `Error when trying to get a mp : ${error.name} = ${error.message}`,
      );
      throw error;
    }
  }
}
