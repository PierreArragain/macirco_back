import { Test, TestingModule } from '@nestjs/testing';
import { Status } from '../../common/constants';
import { ConstituencyService } from '../application/constituency.service';
import { ConstituencyServiceMock } from '../domain/mocks/constituency.service.mock';
import { constituencyFeatureDtoMock } from '../domain/mocks/create-constituency.mock';
import { ConstituencyController } from './constituency.controller';

describe('ConstituencyController', () => {
  let controller: ConstituencyController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ConstituencyController],
      providers: [
        { provide: ConstituencyService, useClass: ConstituencyServiceMock },
      ],
    }).compile();

    controller = module.get<ConstituencyController>(ConstituencyController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('createConstituency', () => {
    it('should return {status: "Added", message: "Constituency created"}', async () => {
      expect(
        controller.createConstituency(constituencyFeatureDtoMock),
      ).resolves.toEqual({
        status: Status.Added,
        message: 'Constituency created',
      });
    });
  });
});
