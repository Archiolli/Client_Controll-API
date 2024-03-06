import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { ProcessosDTO } from './processos.dto';
@Injectable()
export class ProcessosService {
    constructor(private prisma: PrismaService) { }

    async create(data: ProcessosDTO) {
        const processoExists = await this.prisma.user.findFirst({
            where: {
                nome: data.nome,
            },
        });

        if (processoExists) {
            throw new Error('User already exists');
        }

        const processo = await this.prisma.user.create({
            data,
        });

        return processo;
    }

    async findAll() {
        return this.prisma.user.findMany();
    }

    async update(nome: string, data: ProcessosDTO) {
        const processoExists = await this.prisma.user.findUnique({
            where: {
                nome,
            },
        });

        if (!processoExists) {
            throw new Error('Processo does not exists!');
        }

        return await this.prisma.user.update({
            data,
            where: {
                nome,
            },
        });
    }

    async delete(nome: string) {
        const processoExists = await this.prisma.user.findUnique({
            where: {
                nome,
            },
        });

        if (!processoExists) {
            throw new Error('Processo does not exists!');
        }

        return await this.prisma.user.delete({
            where: {
                nome,
            },
        });
    }
}