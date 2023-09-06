import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { MpModule } from '../mp/mp.module';
import { CustomResultsService } from './application/custom-results.service';
import { AddressService } from './infrastructure/address.service';
import { CustomResultsController } from './infrastructure/custom-results.controller';

@Module({
  imports: [MpModule, HttpModule],
  controllers: [CustomResultsController],
  providers: [CustomResultsService, AddressService],
})
export class CustomResultsModule {}
