import { Module } from '@nestjs/common';
import { PetController } from './pet.controller';
import { PetService } from './pet.service';
import { PetRepository } from './pet.repository';

@Module({
  controllers: [PetController],
  providers: [PetService, PetRepository],
})
export class PetModule {}
