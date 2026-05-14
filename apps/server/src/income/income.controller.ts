import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Query,
} from '@nestjs/common';
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

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteById(
    @Param('id') id: string,
    @Query('user_id') userId: string | undefined,
  ): Promise<void> {
    const trimmedUserId = userId?.trim() ?? '';
    if (!trimmedUserId) {
      throw new BadRequestException('Query user_id is required');
    }
    await this.incomeService.remove(id, trimmedUserId);
  }
}
