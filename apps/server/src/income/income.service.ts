import { Injectable } from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';
import { CreateIncomeDto } from './dto/create-income.dto';

@Injectable()
export class IncomeService {
  constructor(private prisma: PrismaService) {}

  create(dto: CreateIncomeDto) {
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

  findAll() {
    return this.prisma.income.findMany({
      orderBy: { created_at: 'desc' },
    });
  }
}
