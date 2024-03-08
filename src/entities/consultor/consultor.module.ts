import { Module } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { ConsultorController } from './consultor.controller';
import { ConsultorService } from './consultor.service';

@Module({
    controllers: [ConsultorController],
    providers: [ConsultorService, PrismaService, JwtService],
})
export class ConsultorModule { }