import { beforeEach, describe, expect, it, jest } from '@jest/globals';
import { Test, TestingModule } from '@nestjs/testing';
import { AllocationController } from './allocation.controller';
import { AllocationService } from './allocation.service';

describe('AllocationController', () => {
  let controller: AllocationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AllocationController],
      providers: [
        {
          provide: AllocationService,
          useValue: {
            create: jest.fn(),
            findAll: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<AllocationController>(AllocationController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
