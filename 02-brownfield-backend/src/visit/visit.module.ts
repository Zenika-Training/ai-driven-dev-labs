import { Module } from '@nestjs/common';
import { VisitController } from './visit.controller';
import { VisitService } from './visit.service';
import { VisitRepository } from './visit.repository';

@Module({
  controllers: [VisitController],
  providers: [VisitService, VisitRepository],
  exports: [VisitService],
})
export class VisitModule {}
