import { Injectable, Logger } from '@nestjs/common';
import { MpEntity } from '../domain/mp.entity';
import { MpDatabaseService } from '../infrastructure/mp.db.service';

@Injectable()
export class MpService {
  private readonly logger = new Logger(MpService.name);

  constructor(private readonly mpDbService: MpDatabaseService) {}

  public async createMp(mp: any) {
    try {
      return this.createMpInDb(mp);
    } catch (error) {
      this.logger.error(
        `Error when trying to create a mp : ${error.name} = ${error.message}`,
      );
      throw error;
    }
  }

  private async createMpInDb(mp: any): Promise<MpEntity> {
    try {
      return this.mpDbService.createMp(mp);
    } catch (error) {
      this.logger.error(
        `Error when trying to create a mp : ${error.name} = ${error.message}`,
      );
      throw error;
    }
  }
}
