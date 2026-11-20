import { Controller, Get, Param, ParseIntPipe, Query } from '@nestjs/common';
import { ApiOkResponse } from '@nestjs/swagger';
import { PetService } from './pet.service';
import { PetDto } from './dto/pet.dto';

@Controller('api/v1/pets')
export class PetController {
  constructor(private readonly petService: PetService) {}

  @Get(':id')
  @ApiOkResponse({ type: PetDto })
  findById(@Param('id', ParseIntPipe) id: number): Promise<PetDto | null> {
    return this.petService.findById(id);
  }

  @Get()
  @ApiOkResponse({ type: PetDto, isArray: true })
  findByName(@Query('name') name: string): Promise<PetDto[]> {
    return this.petService.findByName(name);
  }
}
