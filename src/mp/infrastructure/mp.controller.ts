import { Body, Controller, Logger, Post } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { MpService } from '../application/mp.service';
import { CreateMpDto } from '../domain/createMp.dto';
import { MpEntity } from '../domain/mp.entity';

@Controller('mp')
export class MpController {
  private readonly logger = new Logger(MpController.name);
  constructor(private readonly mpService: MpService) {}

  @Post('/createMp')
  @ApiOperation({ summary: 'Create a mp' })
  async createMp(@Body() mp: CreateMpDto): Promise<MpEntity> {
    return this.mpService.createMp(mp);
  }
}
