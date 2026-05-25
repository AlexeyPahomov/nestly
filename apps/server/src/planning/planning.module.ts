import { Module } from '@nestjs/common';

import { ProjectionService } from './services/projection.service';

@Module({
  providers: [ProjectionService],
  exports: [ProjectionService],
})
export class PlanningModule {}
