import { Injectable, NotFoundException } from '@nestjs/common';

import type { Income } from '../generated/prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CreateIncomeDto } from './dto/create-income.dto';
import { UpdateIncomeDto } from './dto/update-income.dto';

@Injectable()
export class IncomeService {
  constructor(private prisma: PrismaService) {}

  create(dto: CreateIncomeDto): Promise<Income> {
    return this.prisma.income.create({
      data: {
        // TODO убрать хардкод после добавления пользователей
        user_id: '00000000-0000-0000-0000-000000000001',
        amount: dto.amount,
        source: dto.source,
        period_month: new Date(dto.period_month),
      },
    });
  }

  findAll(): Promise<Income[]> {
    return this.prisma.income.findMany({
      orderBy: { created_at: 'desc' },
    });
  }

  async update(id: string, dto: UpdateIncomeDto): Promise<Income> {
    const existing = await this.prisma.income.findFirst({
      where: { id, user_id: dto.user_id },
    });
    if (!existing) {
      throw new NotFoundException();
    }

    return this.prisma.income.update({
      where: { id },
      data: {
        amount: dto.amount,
        source: dto.source,
        period_month: new Date(dto.period_month),
      },
    });
  }

  async remove(id: string, userId: string): Promise<void> {
    const existing = await this.prisma.income.findFirst({
      where: { id, user_id: userId },
    });
    if (!existing) {
      throw new NotFoundException();
    }
    await this.prisma.allocation.deleteMany({ where: { income_id: id } });
    await this.prisma.income.delete({ where: { id } });
  }
}
