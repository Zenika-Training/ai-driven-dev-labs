import { ApiProperty } from '@nestjs/swagger';

export class PetDto {
  @ApiProperty()
  readonly id: number;

  @ApiProperty()
  readonly name: string;

  @ApiProperty()
  readonly ownerName: string;
}
