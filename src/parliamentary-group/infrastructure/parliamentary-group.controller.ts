import { Body, Controller, Logger, Post } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { ParliamentaryGroupService } from '../application/parliamentary-group.service';
import { CreateParliamentaryGroupDto } from '../domain/create-parliamentary-group.dto';
import { ParliamentaryGroupEntity } from '../domain/parliamentary-group.entity';

@Controller('parliamentary-group')
export class ParliamentaryGroupController {
  private readonly logger = new Logger(ParliamentaryGroupController.name);
  constructor(
    private readonly parliamentaryGroupService: ParliamentaryGroupService,
  ) {}

  @Post('/createParliamentaryGroup')
  @ApiOperation({ summary: 'Create a parliamentaryGroup' })
  async createParliamentaryGroup(
    @Body() parliamentaryGroup: CreateParliamentaryGroupDto,
  ): Promise<ParliamentaryGroupEntity> {
    return this.parliamentaryGroupService.createParliamentaryGroup(
      parliamentaryGroup,
    );
  }
}
