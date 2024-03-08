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
    UseGuards,
} from '@nestjs/common';
import { ProcessosDTO } from './processos.dto';
import { ProcessosService } from './processos.service';
import { JwtGuard } from 'src/auth/guards/jwt.guard';

@Controller('processo')
export class ProcessoController {
    constructor(private readonly processoService: ProcessosService) { }

    @UseGuards(JwtGuard)
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

    @UseGuards(JwtGuard)
    @Get()
    async findAll() {
        try {
            return await this.processoService.findAll();
        } catch (error) {
            throw new ForbiddenException(error);
        }
    }

    @UseGuards(JwtGuard)
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

    @UseGuards(JwtGuard)
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