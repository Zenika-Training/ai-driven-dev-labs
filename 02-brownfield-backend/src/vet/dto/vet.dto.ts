import { ApiProperty } from '@nestjs/swagger';

export class VetDto {
  @ApiProperty()
  readonly id: number;

  @ApiProperty()
  readonly name: string;

  @ApiProperty()
  readonly specialty: string;
}
