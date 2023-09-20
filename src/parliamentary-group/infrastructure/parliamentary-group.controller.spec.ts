import { Test, TestingModule } from '@nestjs/testing';
import { Status } from '../../common/constants';
import { ParliamentaryGroupService } from '../application/parliamentary-group.service';
import { createParliamentaryGroupDtoMock } from '../domain/mocks/create-parliamentary-group.mock';
import { ParliamentaryGroupServiceMock } from '../domain/mocks/parliamentary-group.service.mock';
import { ParliamentaryGroupController } from './parliamentary-group.controller';

describe('ParliamentaryGroupController', () => {
  let controller: ParliamentaryGroupController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ParliamentaryGroupController],
      providers: [
        {
          provide: ParliamentaryGroupService,
          useClass: ParliamentaryGroupServiceMock,
        },
      ],
    }).compile();

    controller = module.get<ParliamentaryGroupController>(
      ParliamentaryGroupController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('createParliamentaryGroup', () => {
    it('should return {status: "Added", message: "Parliamentary group created"}', async () => {
      expect(
        controller.createParliamentaryGroup(createParliamentaryGroupDtoMock),
      ).resolves.toEqual({
        status: Status.Added,
        message: 'Parliamentary group created',
      });
    });
  });
});
