import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { ApiOkResponse } from '@nestjs/swagger';
import { VisitService } from './visit.service';
import { VisitDto } from './dto/visit.dto';

@Controller('api/v1/visit')
export class VisitController {
  constructor(private readonly visitService: VisitService) {}

  @Get()
  @ApiOkResponse({ type: VisitDto, isArray: true })
  findAll(): VisitDto[] {
    return this.visitService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({ type: VisitDto })
  findById(@Param('id', ParseIntPipe) id: number): VisitDto | null {
    return this.visitService.findById(id);
  }

  @Get('pet/:petId')
  @ApiOkResponse({ type: VisitDto, isArray: true })
  findByPetId(
    @Param('petId', ParseIntPipe) petId: number,
  ): VisitDto[] {
    return this.visitService.findByPetId(petId);
  }
}
