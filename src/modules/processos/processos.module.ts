import { Module } from '@nestjs/common';
import { ProcessosService } from './processos.service';
import { ProcessoController } from './processos.controller';
import { PrismaService } from '../../database/prisma.service';

@Module({
  controllers: [ProcessoController],
  providers: [ProcessosService, PrismaService],
})
export class ProcessoModule {}