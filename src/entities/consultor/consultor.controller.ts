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
    Request,
    UseGuards,
} from '@nestjs/common';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { ConsultorService } from './consultor.service';
import { ConsultorDTO } from './consultor.dto';

@Controller('consultor')
export class ConsultorController {
    constructor(private readonly consultorService: ConsultorService) { }

    @UseGuards(JwtGuard)
    @Post()
    async create(@Body() data: ConsultorDTO) {

        try {
            return await this.consultorService.create(data);
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
    async findAll(@Request() req) {
        try {
            const { id } = req.user;
            return await this.consultorService.findAll(id);
        } catch (error) {
            throw new ForbiddenException(error);
        }
    }
    @UseGuards(JwtGuard)
    @Put(':id')
    async update(@Param('id') id: string, @Body() data: ConsultorDTO) {

        try {
            return await this.consultorService.update(id, data);
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
            return await this.consultorService.delete(id);
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