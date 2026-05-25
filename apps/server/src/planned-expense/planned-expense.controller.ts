import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';

import { PlannedExpenseService } from './planned-expense.service';
import { CreatePlannedExpenseDto } from './dto/create-planned-expense.dto';
import { UpdatePlannedExpenseDto } from './dto/update-planned-expense.dto';

@Controller('planned-expense')
export class PlannedExpenseController {
  constructor(private readonly plannedExpenseService: PlannedExpenseService) {}

  @Post()
  create(@Body() dto: CreatePlannedExpenseDto) {
    return this.plannedExpenseService.create(dto);
  }

  @Get()
  findAll(@Query('period') period: string | undefined) {
    return this.plannedExpenseService.findAll(period?.trim() || undefined);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Query('user_id') userId: string | undefined,
    @Body() dto: UpdatePlannedExpenseDto,
  ) {
    const trimmedUserId = userId?.trim() ?? '';
    if (!trimmedUserId) {
      throw new BadRequestException('Query user_id is required');
    }
    return this.plannedExpenseService.update(id, trimmedUserId, dto);
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
    await this.plannedExpenseService.remove(id, trimmedUserId);
  }
}
