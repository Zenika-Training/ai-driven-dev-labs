import { ApiProperty } from '@nestjs/swagger';

export class PetDto {
  @ApiProperty()
  readonly id: number;

  @ApiProperty()
  readonly name: string;

  @ApiProperty()
  readonly ownerName: string;

  constructor(id: number, name: string, ownerName: string) {
    this.id = id;
    this.name = name;
    this.ownerName = ownerName;
  }
}
