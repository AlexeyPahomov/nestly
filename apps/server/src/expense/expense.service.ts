import { BadRequestException, Injectable } from '@nestjs/common';
import { sumPrismaMoneyAmounts } from '../lib/money';
import { PrismaService } from '../prisma/prisma.service';
import { CreateExpenseDto } from './dto/create-expense.dto';

@Injectable()
export class ExpenseService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateExpenseDto) {
    // 1. Проверяем категорию
    const category = await this.prisma.category.findUnique({
      where: { id: dto.category_id },
    });

    if (!category) {
      throw new BadRequestException('Category not found');
    }

    // 2. Считаем общий allocation по категории
    const allocations = await this.prisma.allocation.findMany({
      where: { category_id: dto.category_id },
    });

    const allocated = sumPrismaMoneyAmounts(allocations);

    // 3. Считаем уже потраченные деньги
    const expenses = await this.prisma.expense.findMany({
      where: { category_id: dto.category_id },
    });

    const spent = sumPrismaMoneyAmounts(expenses);

    const remaining = allocated - spent;

    // 4. Проверка бюджета
    if (dto.amount > remaining) {
      throw new BadRequestException(
        `Not enough budget. Remaining: ${remaining}`,
      );
    }

    // 5. Создаём расход
    return this.prisma.expense.create({
      data: {
        // TODO убрать хардкод после добавления пользователей
        user_id: '00000000-0000-0000-0000-000000000001',
        category_id: dto.category_id,
        amount: dto.amount,
        description: dto.description,
        date: new Date(dto.date),
      },
    });
  }

  findAll() {
    return this.prisma.expense.findMany({
      include: {
        category: true,
      },
      orderBy: {
        date: 'desc',
      },
    });
  }
}
