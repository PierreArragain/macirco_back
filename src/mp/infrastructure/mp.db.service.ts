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
}
