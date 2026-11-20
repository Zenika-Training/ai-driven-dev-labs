import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { ApiOkResponse } from '@nestjs/swagger';
import { VetService } from './vet.service';
import { VetDto } from './dto/vet.dto';

@Controller('api/v1/vet')
export class VetController {
  constructor(private readonly vetService: VetService) {}

  @Get()
  @ApiOkResponse({ type: VetDto, isArray: true })
  findAll(): Promise<VetDto[]> {
    return this.vetService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({ type: VetDto })
  findById(@Param('id', ParseIntPipe) id: number): Promise<VetDto | null> {
    return this.vetService.findById(id);
  }

  @Get('name/:name')
  @ApiOkResponse({ type: VetDto })
  findByName(@Param('name') name: string): Promise<VetDto | null> {
    return this.vetService.findByName(name);
  }
}
