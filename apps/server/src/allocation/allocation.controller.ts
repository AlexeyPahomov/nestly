import { Body, Controller, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { AllocationService } from './allocation.service';
import { CreateAllocationDto } from './dto/create-allocation.dto';
import { UpdateAllocationDto } from './dto/update-allocation.dto';

@Controller('allocation')
export class AllocationController {
  constructor(private readonly allocationService: AllocationService) {}

  @Post()
  create(@Body() dto: CreateAllocationDto) {
    return this.allocationService.create(dto);
  }

  @Get()
  findAll(@Query('incomeId') incomeId?: string) {
    return this.allocationService.findAll(incomeId);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateAllocationDto) {
    return this.allocationService.update(id, dto);
  }
}
