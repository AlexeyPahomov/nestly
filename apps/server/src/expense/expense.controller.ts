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
import { ExpenseService } from './expense.service';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';

@Controller('expense')
export class ExpenseController {
  constructor(private readonly expenseService: ExpenseService) {}

  @Post()
  create(@Body() dto: CreateExpenseDto) {
    return this.expenseService.create(dto);
  }

  @Get()
  findAll() {
    return this.expenseService.findAll();
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Query('user_id') userId: string | undefined,
    @Body() dto: UpdateExpenseDto,
  ) {
    const trimmedUserId = userId?.trim() ?? '';
    if (!trimmedUserId) {
      throw new BadRequestException('Query user_id is required');
    }
    return this.expenseService.update(id, trimmedUserId, dto);
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
    await this.expenseService.remove(id, trimmedUserId);
  }
}
