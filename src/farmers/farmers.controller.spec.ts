import { Test, TestingModule } from '@nestjs/testing';
import { FarmersController } from './farmers.controller';
import { FarmersService } from './farmers.service';

describe('FarmersController', () => {
  let controller: FarmersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FarmersController],
      providers: [FarmersService],
    }).compile();

    controller = module.get<FarmersController>(FarmersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
