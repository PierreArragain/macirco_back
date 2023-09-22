import { Body, Controller, Logger, Post } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { ResponseDto } from '../../common/dtos/response.dto';
import { ConstituencyService } from '../application/constituency.service';
import { ConstituencyFeatureDto } from '../domain/constituency.feature.dto';

@Controller('constituency')
export class ConstituencyController {
  private readonly logger = new Logger(ConstituencyController.name);
  constructor(private readonly constituencyService: ConstituencyService) {}

  @Post('/createConstituency')
  @ApiOperation({ summary: 'Create a constituency' })
  async createConstituency(
    @Body() feature: ConstituencyFeatureDto,
  ): Promise<ResponseDto> {
    return this.constituencyService.createConstituency(feature);
  }
}
