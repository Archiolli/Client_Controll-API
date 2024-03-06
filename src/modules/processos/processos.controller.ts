import {
    Body,
    Controller,
    Delete,
    ForbiddenException,
    Get,
    HttpException,
    HttpStatus,
    Param,
    Post,
    Put,
} from '@nestjs/common';
import { ProcessosDTO } from './processos.dto';
import { ProcessosService } from './processos.service';

@Controller('processo')
export class ProcessoController {
    constructor(private readonly processoService: ProcessosService) { }

    @Post()
    async create(@Body() data: ProcessosDTO) {

        try {
            return await this.processoService.create(data);
        } catch (error) {
            throw new HttpException({
                statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
                error: `Erro na execução: ${error}`,
            }, HttpStatus.INTERNAL_SERVER_ERROR, {
                cause: error
            });
        }
    }

    @Get()
    async findAll() {
        try {
            return await this.processoService.findAll();
        } catch (error) {
            throw new ForbiddenException();
        }
    }

    @Put(':id')
    async update(@Param('id') id: string, @Body() data: ProcessosDTO) {

        try {
            return await this.processoService.update(id, data);
        } catch (error) {
            throw new HttpException({
                statusCode: HttpStatus.BAD_REQUEST,
                error: `Erro na execução: ${error}`,
            }, HttpStatus.BAD_REQUEST, {
                cause: error
            });
        }
    }

    @Delete(':id')
    async delete(@Param('id') id: string) {
        try {
            return await this.processoService.delete(id);
        } catch (error) {
            throw new HttpException({
                statusCode: HttpStatus.NOT_ACCEPTABLE,
                error: `Erro na execução: ${error}`,
            }, HttpStatus.NOT_ACCEPTABLE, {
                cause: error
            });
        }
    }
}