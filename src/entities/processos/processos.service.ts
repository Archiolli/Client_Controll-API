import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { ProcessosDTO } from './processos.dto';


    
@Injectable()
export class ProcessosService {
    constructor(private prisma: PrismaService) { }

    async create(data: ProcessosDTO) {
        const processoExists = await this.prisma.processos.findFirst({
            where: {
                nome: data.nome,
            },
        });

        if (processoExists) {
            throw new Error('.processos already exists');
        }

        const processo = await this.prisma.processos.create({
            data,
        });

        return processo;
    }

    async findAll() {
        return this.prisma.processos.findMany();
    }

    async update(nome: string, data: ProcessosDTO) {
        const processoExists = await this.prisma.processos.findFirst({
            where: {
                nome,
            },
        });

        if (!processoExists) {
            throw new Error('Processo does not exists!');
        }

        return await this.prisma.processos.update({
            data,
            where: {
                nome,

            },
        });
    }

    async delete(nome: string) {
        const processoExists = await this.prisma.processos.findFirst({
            where: {
                nome,
            },
        });

        if (!processoExists) {
            throw new Error('Processo does not exists!');
        }

        return await this.prisma.processos.delete({
            where: {
                nome,
            },
        });
    }
}