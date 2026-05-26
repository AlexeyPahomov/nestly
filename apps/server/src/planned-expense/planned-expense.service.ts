import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { monthValueFromDate, parsePeriodMonthKey } from '@nestly/shared';

import { BudgetMonthService } from '../budget/budget-month.service';
import { DEV_USER_ID } from '../lib/dev-user';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePlannedExpenseDto } from './dto/create-planned-expense.dto';
import { UpdatePlannedExpenseDto } from './dto/update-planned-expense.dto';

const PLANNED_EXPENSE_INCLUDE = {
  category: true,
  budgetMonth: true,
} as const;

@Injectable()
export class PlannedExpenseService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly budgetMonthService: BudgetMonthService,
  ) {}

  private parsePeriodOrThrow(periodMonth: string) {
    const parsed = parsePeriodMonthKey(periodMonth);
    if (!parsed) {
      throw new BadRequestException('Invalid period month');
    }
    return parsed;
  }

  private async assertCategoryExists(categoryId: string | undefined) {
    if (!categoryId) {
      return;
    }
    const category = await this.prisma.category.findUnique({
      where: { id: categoryId },
    });
    if (!category) {
      throw new BadRequestException('Category not found');
    }
  }

  private async resolveBudgetMonthId(
    userId: string,
    periodMonth: string,
  ): Promise<string> {
    await this.budgetMonthService.ensurePeriodOpen(userId, periodMonth);

    const { year, month } = this.parsePeriodOrThrow(periodMonth);

    const row = await this.prisma.budgetMonth.findUnique({
      where: {
        user_id_year_month: {
          user_id: userId,
          year,
          month,
        },
      },
    });

    if (!row) {
      throw new BadRequestException('Budget month not found');
    }

    return row.id;
  }

  private async findOwned(id: string, userId: string) {
    const row = await this.prisma.plannedExpense.findFirst({
      where: { id, user_id: userId },
    });
    if (!row) {
      throw new NotFoundException();
    }
    return row;
  }

  private dateKeyFromStoredDate(d: Date): string {
    const y = d.getUTCFullYear();
    const m = String(d.getUTCMonth() + 1).padStart(2, '0');
    const day = String(d.getUTCDate()).padStart(2, '0');
    return `${y}-${m}-${day}`;
  }

  async create(dto: CreatePlannedExpenseDto) {
    await this.assertCategoryExists(dto.category_id);

    const plannedDate = new Date(dto.planned_date);
    const periodMonth = monthValueFromDate(plannedDate);
    const budgetMonthId = await this.resolveBudgetMonthId(
      DEV_USER_ID,
      periodMonth,
    );

    return this.prisma.plannedExpense.create({
      data: {
        user_id: DEV_USER_ID,
        title: dto.title.trim(),
        description: dto.description?.trim() || null,
        amount: dto.amount,
        planned_date: plannedDate,
        category_id: dto.category_id ?? null,
        budget_month_id: budgetMonthId,
      },
      include: PLANNED_EXPENSE_INCLUDE,
    });
  }

  findAll(periodMonth?: string) {
    const where: {
      user_id: string;
      budgetMonth?: { year: number; month: number };
    } = { user_id: DEV_USER_ID };

    if (periodMonth) {
      const { year, month } = this.parsePeriodOrThrow(periodMonth);
      where.budgetMonth = { year, month };
    }

    return this.prisma.plannedExpense.findMany({
      where,
      include: PLANNED_EXPENSE_INCLUDE,
      orderBy: [{ planned_date: 'asc' }, { created_at: 'asc' }],
    });
  }

  private resolveReservedAmount(
    amount: number,
    reservedAmount: number | undefined,
    status: string | undefined,
    beforeReserved: number,
  ): number {
    let next =
      reservedAmount !== undefined ? reservedAmount : beforeReserved;

    if (status === 'RESERVED' && reservedAmount === undefined) {
      next = amount;
    }

    if (next < 0 || next > amount) {
      throw new BadRequestException(
        'reserved_amount must be between 0 and amount',
      );
    }

    return next;
  }

  async update(id: string, userId: string, dto: UpdatePlannedExpenseDto) {
    const before = await this.findOwned(id, userId);

    if (dto.category_id !== undefined) {
      await this.assertCategoryExists(dto.category_id ?? undefined);
    }

    const amount =
      dto.amount !== undefined
        ? dto.amount
        : Number(before.amount.toString());

    const hasPlannedDateInDto =
      dto.planned_date !== undefined && dto.planned_date !== '';
    const plannedDate = hasPlannedDateInDto
      ? new Date(dto.planned_date!)
      : before.planned_date;
    const plannedDateChanged =
      hasPlannedDateInDto &&
      dto.planned_date!.trim().slice(0, 10) !==
        this.dateKeyFromStoredDate(before.planned_date);
    const periodChanged =
      plannedDateChanged &&
      monthValueFromDate(plannedDate) !==
        monthValueFromDate(before.planned_date);

    let budgetMonthId = before.budget_month_id;

    if (periodChanged) {
      const targetPeriodMonth = monthValueFromDate(plannedDate);
      budgetMonthId = await this.resolveBudgetMonthId(userId, targetPeriodMonth);
    }

    const reservedAmount = this.resolveReservedAmount(
      amount,
      dto.reserved_amount,
      dto.status,
      Number(before.reserved_amount.toString()),
    );

    await this.prisma.plannedExpense.update({
      where: { id },
      data: {
        title: dto.title?.trim(),
        description:
          dto.description === undefined
            ? undefined
            : dto.description?.trim() || null,
        amount: dto.amount,
        reserved_amount: reservedAmount,
        planned_date: plannedDateChanged ? plannedDate : undefined,
        status: dto.status,
        category_id:
          dto.category_id === undefined ? undefined : dto.category_id,
        budget_month_id: periodChanged ? budgetMonthId : undefined,
      },
    });

    const row = await this.prisma.plannedExpense.findFirst({
      where: { id, user_id: userId },
      include: PLANNED_EXPENSE_INCLUDE,
    });

    if (!row) {
      throw new NotFoundException();
    }

    return row;
  }

  async remove(id: string, userId: string): Promise<void> {
    await this.findOwned(id, userId);
    await this.prisma.plannedExpense.delete({ where: { id } });
  }
}
