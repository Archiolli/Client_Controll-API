import { Module } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { VistosController } from './vistos.controller';
import { VistosService } from './vistos.service';

@Module({
    controllers: [VistosController],
    providers: [VistosService, PrismaService, JwtService],
})
export class VistosModule { }