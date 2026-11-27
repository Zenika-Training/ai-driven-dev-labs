import { ApiProperty } from '@nestjs/swagger';
import { VisitDto } from '../../visit/dto/visit.dto';

export class InvoiceDto {
  @ApiProperty()
  readonly id: number;

  @ApiProperty()
  readonly invoiceNumber: string;

  @ApiProperty()
  readonly invoiceDate: Date;

  @ApiProperty({ type: String })
  readonly amount: string;

  @ApiProperty({ type: VisitDto })
  readonly visit: VisitDto;
}
