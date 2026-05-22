import { DEFAULT_ALLOCATION_TYPE, monthValueFromDate } from '@nestly/shared';
import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { BudgetMonthService } from '../budget/budget-month.service';
import { BudgetProjectorService } from '../budget/budget-projector.service';
import { runBudgetProjection } from '../lib/budget-projection';
import { DEV_USER_ID } from '../lib/dev-user';
import { sumPrismaMoneyAmounts, toMoneyNumber } from '../lib/money';
import { PrismaService } from '../prisma/prisma.service';
import { CreateAllocationDto } from './dto/create-allocation.dto';

@Injectable()
export class AllocationService {
  private readonly logger = new Logger(AllocationService.name);

  constructor(
    private prisma: PrismaService,
    private readonly budgetMonthService: BudgetMonthService,
    private readonly budgetProjector: BudgetProjectorService,
  ) {}

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

    const allocatedAmount = sumPrismaMoneyAmounts(allocations);

    const nextTotal = allocatedAmount + dto.amount;

    if (nextTotal > toMoneyNumber(income.amount.toString())) {
      throw new BadRequestException('Allocation exceeds income amount');
    }

    await this.budgetMonthService.ensurePeriodOpen(
      DEV_USER_ID,
      monthValueFromDate(income.period_month),
    );

    const allocation = await this.prisma.allocation.create({
      data: {
        // TODO убрать хардкод после добавления пользователей
        user_id: DEV_USER_ID,
        income_id: dto.income_id,
        category_id: dto.category_id,
        amount: dto.amount,
        type: DEFAULT_ALLOCATION_TYPE,
        period_month: income.period_month,
      },
    });

    runBudgetProjection(
      this.logger,
      'allocation create',
      this.budgetProjector.onAllocationCreated(this.prisma, allocation),
    );

    return allocation;
  }

  findAll(incomeId?: string) {
    return this.prisma.allocation.findMany({
      where: incomeId ? { income_id: incomeId } : undefined,
      include: {
        category: true,
        income: true,
      },
      orderBy: { created_at: 'desc' },
    });
  }
}
