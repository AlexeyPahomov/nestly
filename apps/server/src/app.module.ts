import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { IncomeModule } from './income/income.module';
import { AllocationModule } from './allocation/allocation.module';
import { CategoryModule } from './category/category.module';
import { ExpenseModule } from './expense/expense.module';

@Module({
  imports: [PrismaModule, IncomeModule, AllocationModule, CategoryModule, ExpenseModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
