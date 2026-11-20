import { Module } from '@nestjs/common';
import { VetController } from './vet.controller';
import { VetService } from './vet.service';
import { VetRepository } from './vet.repository';

@Module({
  controllers: [VetController],
  providers: [VetService, VetRepository],
  exports: [VetService],
})
export class VetModule {}
