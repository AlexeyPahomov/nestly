import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateAllocationDto } from './dto/create-allocation.dto';

@Injectable()
export class AllocationService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateAllocationDto) {
    const income = await this.prisma.income.findUnique({
      where: {
        id: dto.income_id,
      },
    });

    if (!income) {
      throw new BadRequestException('Income not found');
    }

    const allocations = await this.prisma.allocation.findMany({
      where: {
        income_id: dto.income_id,
      },
    });

    const allocatedAmount = allocations.reduce(
      (sum, item) => sum + Number(item.amount),
      0,
    );

    const nextTotal = allocatedAmount + dto.amount;

    if (nextTotal > Number(income.amount)) {
      throw new BadRequestException('Allocation exceeds income amount');
    }

    return this.prisma.allocation.create({
      data: {
        // TODO убрать хардкод после добавления пользователей
        user_id: '00000000-0000-0000-0000-000000000001',
        income_id: dto.income_id,
        category_id: dto.category_id,
        amount: dto.amount,
      },
    });
  }

  findAll() {
    return this.prisma.allocation.findMany({
      include: {
        category: true,
        income: true,
      },
    });
  }
}
