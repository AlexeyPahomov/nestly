import { beforeEach, describe, expect, it, jest } from '@jest/globals';
import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../prisma/prisma.service';
import { AllocationService } from './allocation.service';

describe('AllocationService', () => {
  let service: AllocationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AllocationService,
        {
          provide: PrismaService,
          useValue: {
            income: { findUnique: jest.fn() },
            allocation: {
              findMany: jest.fn(),
              create: jest.fn(),
            },
          },
        },
      ],
    }).compile();

    service = module.get<AllocationService>(AllocationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
