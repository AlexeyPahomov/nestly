import { Module } from '@nestjs/common';
import { BudgetMonthController } from './budget-month.controller';
import { BudgetMonthService } from './budget-month.service';
import { BudgetProjectorService } from './budget-projector.service';
import { BudgetRebuildService } from './budget-rebuild.service';

@Module({
  controllers: [BudgetMonthController],
  providers: [BudgetRebuildService, BudgetMonthService, BudgetProjectorService],
  exports: [BudgetMonthService, BudgetProjectorService, BudgetRebuildService],
})
export class BudgetModule {}
