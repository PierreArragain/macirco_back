import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConstituencyService } from './constituency.service';
import { ConstituencyEntity } from './domain/constituency.entity';
import { ConstituencyController } from './infrastructure/constituency.controller';

@Module({
  imports: [TypeOrmModule.forFeature([ConstituencyEntity])],
  providers: [ConstituencyService],
  controllers: [ConstituencyController],
})
export class ConstituencyModule {}
