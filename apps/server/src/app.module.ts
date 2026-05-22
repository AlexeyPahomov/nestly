import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { PrismaModule } from './prisma/prisma.module';
import { IncomeModule } from './income/income.module';
import { AllocationModule } from './allocation/allocation.module';
import { CategoryModule } from './category/category.module';
import { ExpenseModule } from './expense/expense.module';
import { BudgetModule } from './budget/budget.module';

@Module({
  imports: [
    PrismaModule,
    IncomeModule,
    AllocationModule,
    CategoryModule,
    ExpenseModule,
    BudgetModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
