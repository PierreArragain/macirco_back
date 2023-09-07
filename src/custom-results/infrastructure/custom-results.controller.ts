import { Body, Controller, Logger, Post } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { CustomResultsService } from '../application/custom-results.service';
import { GetMPDto } from '../domain/get-mp.dto';
import { MpResultDto } from '../domain/mp-result.dto';

@Controller('custom-results')
export class CustomResultsController {
  private readonly logger = new Logger(CustomResultsController.name);
  constructor(private readonly customResultsService: CustomResultsService) {}

  @Post('/getMpByAddress')
  @ApiOperation({ summary: 'Get a mp by address' })
  async getMpByAddress(@Body() getMpDto: GetMPDto): Promise<MpResultDto> {
    return this.customResultsService.getMpByAddress(getMpDto);
  }
}
