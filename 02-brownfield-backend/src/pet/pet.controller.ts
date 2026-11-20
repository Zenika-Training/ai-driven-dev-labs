import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { ApiOkResponse } from '@nestjs/swagger';
import { PetService } from './pet.service';
import { PetDto } from './dto/pet.dto';
import { CreatePetDto } from './dto/create-pet.dto';

@Controller('api/v1/pet')
export class PetController {
  constructor(private readonly petService: PetService) {}

  @Get()
  @ApiOkResponse({ type: PetDto, isArray: true })
  findAll(): Promise<PetDto[]> {
    return this.petService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({ type: PetDto })
  findById(@Param('id', ParseIntPipe) id: number): Promise<PetDto | null> {
    return this.petService.findById(id);
  }

  @Get('name/:name')
  @ApiOkResponse({ type: PetDto })
  findByName(@Param('name') name: string): Promise<PetDto | null> {
    return this.petService.findByName(name);
  }

  @Post()
  @ApiOkResponse({ type: PetDto })
  save(@Body() createPetDto: CreatePetDto): Promise<PetDto> {
    return this.petService.save(createPetDto);
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.petService.delete(id);
  }
}
