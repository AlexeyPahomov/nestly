import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { AllocationService } from './allocation.service';
import { CreateAllocationDto } from './dto/create-allocation.dto';

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
}
