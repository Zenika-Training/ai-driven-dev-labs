import { ApiProperty } from '@nestjs/swagger';
import { PetDto } from '../../pet/dto/pet.dto';
import { VetDto } from '../../vet/dto/vet.dto';

export class VisitDto {
  @ApiProperty()
  readonly id: number;

  @ApiProperty()
  readonly dateTime: Date;

  @ApiProperty()
  readonly clinic: string;

  @ApiProperty()
  readonly summary: string;

  @ApiProperty({ type: PetDto })
  readonly pet: PetDto;

  @ApiProperty({ type: VetDto, nullable: true })
  readonly vet: VetDto | null;
}
