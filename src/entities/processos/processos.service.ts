import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { ProcessosDTO } from './processos.dto';



@Injectable()
export class ProcessosService {
    constructor(private prisma: PrismaService) { }

    async create(data: ProcessosDTO) {
        const processoExists = await this.prisma.cliente.findFirst({
            where: {
                nome: data.nome,
            },
        });

        if (processoExists) {
            throw new Error('processos already exists');
        }

        const consultorExists = await this.prisma.consultor.findUnique({
            where: {
                id: data.consultorId,
            },
        });

        if (!consultorExists) {
            throw new NotFoundException('Consultor não encontrado.');
        }

        const vistoExists = await this.prisma.visto.findUnique({
            where: {
                id: data.vistoId,
            },
        });

        if (!vistoExists) {
            throw new NotFoundException('Visto não encontrado.');
        }


        const processo = await this.prisma.cliente.create({
            data
        });

        return processo;
    }

    async findAll() {
        const processos = this.prisma.cliente.findMany({
            include: {
                consultor: {
                    select: {
                        nome: true
                    }
                },
                visto: {
                    select: {
                        tipo: true
                    }
                }
            }
        });
    }

    async update(nome: string, data: ProcessosDTO) {
        const processoExists = await this.prisma.cliente.findFirst({
            where: {
                nome,
            },
        });

        if (!processoExists) {
            throw new Error('Processo does not exists!');
        }

        return await this.prisma.cliente.update({
            data,
            where: {
                nome,

            },
        });
    }

    async delete(nome: string) {
        const casosExists = await this.prisma.cliente.findFirst({
            where: {
                nome,
            },
        });

        if (!casosExists) {
            throw new Error('Processo does not exists!');
        }

        return await this.prisma.cliente.delete({
            where: {
                nome,
            },
        });
    }
}