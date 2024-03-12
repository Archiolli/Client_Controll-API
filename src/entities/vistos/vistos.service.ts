import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { vistosDTO } from './vistos.dto';



@Injectable()
export class VistosService {
    constructor(private prisma: PrismaService) { }


    async create(data: vistosDTO) {
        const vistoExists = await this.prisma.visto.findFirst({
            where: {
                tipo: data.tipo,
            },
        });

        if (vistoExists) {
            throw new Error('Visto already exists');
        }

        const visto = await this.prisma.visto.create({
            data
        });

        return visto;
    }

    async findAll(userId: number) {
        return this.prisma.visto.findMany({
            where: {
                userId: userId
            }
        });
    }


    async getById(id: number, userId: number) {
        const caseExists = await this.prisma.visto.findUnique({
            where: {
                id,
            },
        });

        if (!caseExists) {
            throw new Error('Case does not exist!');
        }

        if (caseExists.userId !== userId) {
            throw new ForbiddenException("You are not authorized to access this resource.");
        }

        return caseExists;
    }


    async update(tipo: string, data: vistosDTO) {
        const processoExists = await this.prisma.visto.findFirst({
            where: {
                tipo,
            },
        });

        if (!processoExists) {
            throw new Error('Visto does not exists!');
        }

        return await this.prisma.visto.update({
            data,
            where: {
                tipo,

            },
        });
    }


    async delete(tipo: string) {
        const vistoExists = await this.prisma.visto.findFirst({
            where: {
                tipo,
            },
        });

        if (!vistoExists) {
            throw new Error('Visto does not exists!');
        }

        return await this.prisma.visto.delete({
            where: {
                tipo,
            },
        });
    }
}