import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { ConsultorDTO } from './consultor.dto';


    
@Injectable()
export class ConsultorService {
    constructor(private prisma: PrismaService) { }

    
    async create(data : ConsultorDTO)  {
        const ConsultorExists = await this.prisma.consultor.findFirst({
            where: {
                nome: data.nome,
            },
        });

        if (ConsultorExists) {
            throw new Error('Consultor already exists');
        }

        const consultor = await this.prisma.consultor.create({
            data
        });

        return consultor;
    }

    async findAll(userId : number) {

        
        
        return this.prisma.consultor.findMany({
            where:{
                userId: userId
            }
        });
    }


    async update(nome: string, data: ConsultorDTO) {
        const processoExists = await this.prisma.consultor.findFirst({
            where: {
                nome,
            },
        });

        if (!processoExists) {
            throw new Error('Consultor does not exists!');
        }

        return await this.prisma.consultor.update({
            data,
            where: {
                nome,

            },
        });
    }


    async delete(nome: string) {
        const ConsultorExists = await this.prisma.consultor.findFirst({
            where: {
                nome,
            },
        });

        if (!ConsultorExists) {
            throw new Error('Consultor does not exists!');
        }

        return await this.prisma.consultor.delete({
            where: {
                nome,
            },
        });
    }
}