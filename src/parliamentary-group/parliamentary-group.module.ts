import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ParliamentaryGroupService } from './application/parliamentary-group.service';
import { ParliamentaryGroupEntity } from './domain/parliamentary-group.entity';
import { ParliamentaryGroupController } from './infrastructure/parliamentary-group.controller';
import { ParliamentaryGroupDatabaseService } from './infrastructure/parliamentary-group.db.service';

@Module({
  imports: [TypeOrmModule.forFeature([ParliamentaryGroupEntity])],
  controllers: [ParliamentaryGroupController],
  providers: [ParliamentaryGroupService, ParliamentaryGroupDatabaseService],
  exports: [ParliamentaryGroupService],
})
export class ParliamentaryGroupModule {}
