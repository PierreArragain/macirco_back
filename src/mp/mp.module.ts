import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConstituencyEntity } from '../constituency/domain/constituency.entity';
import { MpService } from './application/mp.service';
import { MpEntity } from './domain/mp.entity';
import { MpController } from './infrastructure/mp.controller';
import { MpDatabaseService } from './infrastructure/mp.db.service';

@Module({
  imports: [TypeOrmModule.forFeature([MpEntity])],
  providers: [MpService, MpDatabaseService],
  controllers: [MpController],
  exports: [MpService],
})
export class MpModule {}
