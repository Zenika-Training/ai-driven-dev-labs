import { ApiProperty } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';
import { VisitDto } from '../../visit/dto/visit.dto';

export class InvoiceDto {
  @ApiProperty()
  readonly id: number;

  @ApiProperty()
  readonly invoiceNumber: string;

  @ApiProperty()
  readonly invoiceDate: Date;

  @ApiProperty({ type: String })
  readonly amount: Prisma.Decimal;

  @ApiProperty({ type: VisitDto })
  readonly visit: VisitDto;
}
