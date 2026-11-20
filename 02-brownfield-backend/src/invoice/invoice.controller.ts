import { Controller, Get, Header, Param, ParseIntPipe, Res } from '@nestjs/common';
import { ApiOkResponse } from '@nestjs/swagger';
import { Response } from 'express';
import { InvoiceService } from './invoice.service';
import { InvoiceDto } from './dto/invoice.dto';

@Controller('api/v1/invoices')
export class InvoiceController {
  constructor(private readonly invoiceService: InvoiceService) {}

  @Get()
  @ApiOkResponse({ type: InvoiceDto, isArray: true })
  findAll(): Promise<InvoiceDto[]> {
    return this.invoiceService.findAll();
  }

  @Get(':id/pdf')
  @Header('Content-Type', 'application/pdf')
  async downloadPdf(
    @Param('id', ParseIntPipe) id: number,
    @Res() res: Response,
  ): Promise<void> {
    const pdfContent = await this.invoiceService.generatePdf(id);
    res.setHeader(
      'Content-Disposition',
      `attachment; filename=invoice-${id}.pdf`,
    );
    res.send(pdfContent);
  }
}
