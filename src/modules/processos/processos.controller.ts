import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
  } from '@nestjs/common';
  import { ProcessosDTO } from './processos.dto';
  import { ProcessosService } from './processos.service';
  
  @Controller('processo')
  export class ProcessoController {
    constructor(private readonly processoService: ProcessosService) {}
  
    @Post()
    async create(@Body() data: ProcessosDTO) {
      return this.processoService.create(data);
    }
  
    @Get()
    async findAll() {
      return this.processoService.findAll();
    }
  
    @Put(':id')
    async update(@Param('id') id: string, @Body() data: ProcessosDTO) {
      return this.processoService.update(id, data);
    }
  
    @Delete(':id')
    async delete(@Param('id') id: string) {
      return this.processoService.delete(id);
    }
  }