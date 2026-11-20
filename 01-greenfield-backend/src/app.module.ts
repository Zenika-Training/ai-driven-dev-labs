import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { PetModule } from './pet/pet.module';

@Module({
  imports: [PrismaModule, PetModule],
})
export class AppModule {}
