import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConstituencyService } from './application/constituency.service';
import { ConstituencyEntity } from './domain/constituency.entity';
import { ConstituencyController } from './infrastructure/constituency.controller';
import { ConstituencyDatabaseService } from './infrastructure/constituency.db.service';

@Module({
  imports: [TypeOrmModule.forFeature([ConstituencyEntity])],
  providers: [ConstituencyService, ConstituencyDatabaseService],
  controllers: [ConstituencyController],
  exports: [ConstituencyService],
})
export class ConstituencyModule {}
