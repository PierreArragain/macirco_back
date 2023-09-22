import { Body, Controller, Get, Logger, Param, Post } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { GoogleNewsDto } from '../../mp/domain/google-news.dto';
import { MpResultDto } from '../../mp/domain/mp-result.dto';
import { CustomResultsService } from '../application/custom-results.service';
import { GetMPDto } from '../domain/get-mp.dto';

@Controller('custom-results')
export class CustomResultsController {
  private readonly logger = new Logger(CustomResultsController.name);
  constructor(private readonly customResultsService: CustomResultsService) {}

  @Post('/getMpByAddress')
  @ApiOperation({ summary: 'Get a mp by address' })
  async getMpByAddress(@Body() getMpDto: GetMPDto): Promise<MpResultDto> {
    return this.customResultsService.getMpByAddress(getMpDto);
  }

  @Post('/getNewsByAddress')
  @ApiOperation({ summary: 'Get news' })
  async getNews(@Body() getMpDto: GetMPDto): Promise<GoogleNewsDto[]> {
    return this.customResultsService.getMpNewsByAddress(getMpDto);
  }

  @Get('/getNewsByMpId/:idMp')
  @ApiOperation({ summary: 'Get news' })
  async getNewsByMpId(@Param('idMp') idMp: number): Promise<GoogleNewsDto[]> {
    return this.customResultsService.getMpNewsByMpId(+idMp);
  }
}
