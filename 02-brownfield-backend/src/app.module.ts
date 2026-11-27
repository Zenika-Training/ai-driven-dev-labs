import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { PetModule } from './pet/pet.module';
import { VetModule } from './vet/vet.module';
import { VisitModule } from './visit/visit.module';
import { InvoiceModule } from './invoice/invoice.module';

@Module({
  imports: [DatabaseModule, PetModule, VetModule, VisitModule, InvoiceModule],
})
export class AppModule {}
