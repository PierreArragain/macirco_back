import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConstituencyModule } from '../constituency/constituency.module';
import { ParliamentaryGroupModule } from '../parliamentary-group/parliamentary-group.module';
import { MpService } from './application/mp.service';
import { MpEntity } from './domain/mp.entity';
import { MpController } from './infrastructure/mp.controller';
import { MpDatabaseService } from './infrastructure/mp.db.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([MpEntity]),
    ConstituencyModule,
    ParliamentaryGroupModule,
  ],
  providers: [MpService, MpDatabaseService],
  controllers: [MpController],
  exports: [MpService],
})
export class MpModule {}
