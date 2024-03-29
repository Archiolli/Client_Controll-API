import { MiddlewareConsumer, Module } from '@nestjs/common';
import { ProcessosService } from './processos.service';
import { ProcessoController } from './processos.controller';
import { PrismaService } from '../../database/prisma.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  controllers: [ProcessoController],
  providers: [ProcessosService, PrismaService, JwtService],
})
export class ProcessoModule { }