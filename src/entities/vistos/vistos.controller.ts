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
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { VistosService } from './vistos.service';
import { vistosDTO } from './vistos.dto';

@Controller('vistos')
export class VistosController {
    constructor(private readonly vistoService: VistosService) { }

    @Post()
    async create(@Body() data: vistosDTO) {

        try {
            return await this.vistoService.create(data);
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
            return await this.vistoService.findAll();
        } catch (error) {
            throw new ForbiddenException(error);
        }
    }

    @Put(':id')
    async update(@Param('id') id: string, @Body() data: vistosDTO) {

        try {
            return await this.vistoService.update(id, data);
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
            return await this.vistoService.delete(id);
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