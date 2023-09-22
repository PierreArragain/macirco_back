import { Body, Controller, Logger, Post } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { ResponseDto } from '../../common/dtos/response.dto';
import { MpService } from '../application/mp.service';
import { CreateMpDto } from '../domain/create-mp.dto';

@Controller('mp')
export class MpController {
  private readonly logger = new Logger(MpController.name);
  constructor(private readonly mpService: MpService) {}

  @Post('/createMp')
  @ApiOperation({ summary: 'Create a mp' })
  async createMp(@Body() mp: CreateMpDto): Promise<ResponseDto> {
    return this.mpService.createMp(mp);
  }
}
