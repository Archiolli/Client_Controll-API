import {
    Body,
    Controller,
    Delete,
    ForbiddenException,
    Get,
    Header,
    HttpException,
    HttpStatus,
    Param,
    Post,
    Put,
    Request,
    UseGuards,
} from '@nestjs/common';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { VistosService } from './vistos.service';
import { vistosDTO } from './vistos.dto';

@Controller('vistos')
export class VistosController {
    constructor(private readonly vistoService: VistosService) { }

    @UseGuards(JwtGuard)
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

    @UseGuards(JwtGuard)
    @Get()
    @Header('Cache-Control', 'none')
    async findAll(@Request() req): Promise<vistosDTO[]> {
        try {
            const { id } = req.user
            return await this.vistoService.findAll(id);
        } catch (error) {
            throw new ForbiddenException(error);
        }
    }

    @UseGuards(JwtGuard)
    @Get(':id')
    @Header('Cache-Control', 'none')
    async getById(@Param('id') id: number, @Request() req): Promise<vistosDTO> {
        try {
            const userId = req.user.id;
            return await this.vistoService.getById(id, userId);
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

    @UseGuards(JwtGuard)
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