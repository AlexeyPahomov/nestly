import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';

const DEV_USER_ID = '00000000-0000-0000-0000-000000000001';

@Injectable()
export class ExpenseService {
  constructor(private prisma: PrismaService) {}

  private async assertCategoryExists(categoryId: string) {
    const category = await this.prisma.category.findUnique({
      where: { id: categoryId },
    });
    if (!category) {
      throw new BadRequestException('Category not found');
    }
  }

  private async findOwned(id: string, userId: string) {
    const expense = await this.prisma.expense.findFirst({
      where: { id, user_id: userId },
    });
    if (!expense) {
      throw new NotFoundException();
    }
    return expense;
  }

  async create(dto: CreateExpenseDto) {
    await this.assertCategoryExists(dto.category_id);

    return this.prisma.expense.create({
      data: {
        user_id: DEV_USER_ID,
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

  async update(id: string, userId: string, dto: UpdateExpenseDto) {
    await this.findOwned(id, userId);
    await this.assertCategoryExists(dto.category_id);

    return this.prisma.expense.update({
      where: { id },
      data: {
        category_id: dto.category_id,
        amount: dto.amount,
        description: dto.description,
        date: new Date(dto.date),
      },
    });
  }

  async remove(id: string, userId: string): Promise<void> {
    await this.findOwned(id, userId);
    await this.prisma.expense.delete({ where: { id } });
  }
}
