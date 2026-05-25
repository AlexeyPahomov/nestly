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

  private periodMonthFromBudgetMonthId(budgetMonthId: string) {
    return this.prisma.budgetMonth.findUnique({
      where: { id: budgetMonthId },
      select: { year: true, month: true },
    });
  }

  private async ensureOpenForPeriod(userId: string, periodMonth: string) {
    await this.budgetMonthService.ensurePeriodOpen(userId, periodMonth);
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

  async update(id: string, userId: string, dto: UpdatePlannedExpenseDto) {
    const before = await this.findOwned(id, userId);

    if (dto.category_id !== undefined) {
      await this.assertCategoryExists(dto.category_id ?? undefined);
    }

    const plannedDate = dto.planned_date
      ? new Date(dto.planned_date)
      : before.planned_date;

    const targetPeriodMonth = dto.planned_date
      ? monthValueFromDate(plannedDate)
      : await this.periodMonthFromBudgetMonthId(before.budget_month_id).then(
          (anchor) =>
            anchor
              ? `${anchor.year}-${String(anchor.month).padStart(2, '0')}`
              : null,
        );

    if (targetPeriodMonth) {
      await this.ensureOpenForPeriod(userId, targetPeriodMonth);
    }

    const budgetMonthId = dto.planned_date
      ? await this.resolveBudgetMonthId(
          userId,
          monthValueFromDate(plannedDate),
        )
      : before.budget_month_id;

    return this.prisma.plannedExpense.update({
      where: { id },
      data: {
        title: dto.title?.trim(),
        description:
          dto.description === undefined
            ? undefined
            : dto.description?.trim() || null,
        amount: dto.amount,
        planned_date: dto.planned_date ? plannedDate : undefined,
        status: dto.status,
        category_id:
          dto.category_id === undefined ? undefined : dto.category_id,
        budget_month_id: budgetMonthId,
      },
      include: PLANNED_EXPENSE_INCLUDE,
    });
  }

  async remove(id: string, userId: string): Promise<void> {
    await this.findOwned(id, userId);
    await this.prisma.plannedExpense.delete({ where: { id } });
  }
}
