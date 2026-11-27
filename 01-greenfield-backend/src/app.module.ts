import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { PetModule } from './pet/pet.module';

@Module({
  imports: [DatabaseModule, PetModule],
})
export class AppModule {}
