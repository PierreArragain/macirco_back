import { Test, TestingModule } from '@nestjs/testing';
import { Status } from '../../common/constants';
import { MpService } from '../application/mp.service';
import { createMpDtoMock } from '../domain/mocks/create-mp.mock';
import { MpServiceMock } from '../domain/mocks/mp.service.mock';
import { MpController } from './mp.controller';

describe('MpController', () => {
  let controller: MpController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MpController],
      providers: [{ provide: MpService, useClass: MpServiceMock }],
    }).compile();

    controller = module.get<MpController>(MpController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('createMp', () => {
    it('should return {status: "Added", message: "Mp created"}', async () => {
      expect(controller.createMp(createMpDtoMock)).resolves.toEqual({
        status: Status.Added,
        message: 'Mp created',
      });
    });
  });
});
