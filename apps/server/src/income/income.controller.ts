import { Body, Controller, Get, Post } from '@nestjs/common';
import type { Income } from '../generated/prisma/client';
import { CreateIncomeDto } from './dto/create-income.dto';
import { IncomeService } from './income.service';

@Controller('income')
export class IncomeController {
  constructor(private readonly incomeService: IncomeService) {}

  @Post()
  create(@Body() dto: CreateIncomeDto): Promise<Income> {
    return this.incomeService.create(dto);
  }

  @Get()
  findAll(): Promise<Income[]> {
    return this.incomeService.findAll();
  }
}
